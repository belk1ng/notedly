import {
  Component,
  type PropsWithChildren,
  type ReactNode,
  type ErrorInfo,
} from "react";
import { Typography } from "@/components";
import { StyledErrorBoundary } from "./styled";

export interface ErrorBoundaryProps {
  FallbackComponent?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  State
> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error :", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.FallbackComponent ?? (
          <StyledErrorBoundary>
            <Typography variant={"heading-1"}>Uncaught error 😵</Typography>
          </StyledErrorBoundary>
        )
      );
    }

    return this.props.children;
  }
}
