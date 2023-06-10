import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    darkAccent: string;
    bgContainer: string;
    bgTable: string;
  }
}
