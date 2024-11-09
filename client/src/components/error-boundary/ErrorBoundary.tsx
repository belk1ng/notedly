import { ApolloError } from "@apollo/client";
import { Component, type PropsWithChildren, type ReactNode } from "react";
import { Typography } from "@/components";
import { StyledErrorBoundary } from "./styled";

export interface ErrorBoundaryProps {
  renderFallback?: (error: Error | ApolloError) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  State
> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error) {
    console.error("Uncaught error :", error);
    this.setState({ error });
  }

  public render() {
    if (this.state.error) {
      return (
        this.props.renderFallback?.(this.state.error) ?? (
          <StyledErrorBoundary>
            <Typography variant={"heading-1"}>Uncaught error 😵</Typography>
          </StyledErrorBoundary>
        )
      );
    }

    return this.props.children;
  }
}
