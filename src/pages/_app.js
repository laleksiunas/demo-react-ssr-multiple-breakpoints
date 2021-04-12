import { ThemeProvider } from '../theme';
import '../theme/global.scss';

const SsrDemoApp = ({ Component }) => (
  <ThemeProvider>
    <Component />
  </ThemeProvider>
);

export default SsrDemoApp;
