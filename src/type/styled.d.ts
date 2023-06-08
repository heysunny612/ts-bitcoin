import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    dark: ITheme;
    light: ITheme;
  }
}

interface ITheme {
  textColor: string;
  bgColor: string;
  accentColor: string;
  darkAccent: string;
  bgContainer: string;
  bgTable: string;
}
