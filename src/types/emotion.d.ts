// src/types/emotion.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
  }
}

// Добавляем поддержку css prop для всех компонентов
import { CSSProp } from '@emotion/react';

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}