import { useEffect } from 'react';

import { ThemeProvider } from '../theme';
import '../theme/global.scss';
import environment from '../core/environment';

const SsrDemoApp = ({ Component }) => {
  useEffect(() => {
    environment.isHydrationRender = false;
  }, []);

  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
};

export default SsrDemoApp;
