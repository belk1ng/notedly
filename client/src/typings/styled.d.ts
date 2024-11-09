import "styled-components";
import type { RuleSet } from "styled-components/dist/types";

declare module "styled-components" {
  export interface Colors {
    main: MainColors;
    neutral: NeutralColors;
    service: ServiceColors;
  }

  export interface MainColors {
    accent: string;
    hover: string;
  }

  export interface NeutralColors {
    primary: string;
    white: string;
    "gray-1": string;
    "gray-2": string;
    "gray-3": string;
    "gray-4": string;
  }

  export interface ServiceColors {
    error: string;
  }

  export interface Mixins {
    box: (size: number) => RuleSet;
    buttonReset: () => RuleSet;
    linkReset: () => RuleSet;
    hover: (content: RuleSet) => RuleSet;
  }

  export interface DefaultTheme {
    colors: Colors;
    mixins: Mixins;
  }
}
