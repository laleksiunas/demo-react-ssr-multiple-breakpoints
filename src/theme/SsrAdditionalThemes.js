import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import environment from '../core/environment';
import { getCurrentTheme } from './utils';
import themes from './theme';
import ThemeProvider from './ThemeProvider';
import styles from './components/ssr-additional-themes.module.scss';

const themeNameMapper = Object.fromEntries(
  Object.entries(themes).map(([themeName, breakpoint]) => [breakpoint, themeName])
);

const SsrAdditionalThemes = ({ themes: additionalSsrThemes = [], children }) => {
  const [enableBoundaries, setEnableBoundaries] = useState(environment.isHydrationRender);

  const [ssrThemes] = useState(() => Array.from(new Set([...additionalSsrThemes, themes.xl])).sort((x, y) => x - y));

  const initialMatchedClientThemeRef = useRef(null);

  useEffect(() => setEnableBoundaries(false), []);

  if (environment.isClient && !initialMatchedClientThemeRef.current) {
    const currentTheme = getCurrentTheme();

    initialMatchedClientThemeRef.current = ssrThemes.find((theme) => theme >= currentTheme);
  }

  return (
    <div>
      {ssrThemes.map((theme, themeIndex) => {
        const canRenderTheme = environment.isServer || theme === initialMatchedClientThemeRef.current;

        if (!enableBoundaries && !canRenderTheme) {
          return null;
        }

        const boundariesClassNames =
          enableBoundaries &&
          cx(
            themeIndex !== 0 && styles[`${themeNameMapper[ssrThemes[themeIndex - 1]]}LowerBoundary`],
            styles[`${themeNameMapper[theme]}UpperBoundary`]
          );

        return (
          <div
            key={theme}
            className={cx(styles.themeWrapper, boundariesClassNames)}
            suppressHydrationWarning={!canRenderTheme}
          >
            {canRenderTheme && <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>}
          </div>
        );
      })}
    </div>
  );
};

export default SsrAdditionalThemes;
