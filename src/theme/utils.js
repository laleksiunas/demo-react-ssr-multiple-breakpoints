import { breakpoints } from './theme';

export const getCurrentTheme = () => breakpoints.find((b) => b <= document.body.clientWidth);
