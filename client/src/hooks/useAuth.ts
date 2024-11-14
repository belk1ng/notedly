import {
  useIsAuthenticatedQuery,
  useUserInfoLazyQuery,
} from "@/apollo/generated/types";
import { AuthService } from "@/apollo/services";

export const useAuth = () => {
  const { loading: isAuthenticatedLoading, data: isAuthenticatedData } =
    useIsAuthenticatedQuery();

  const [getUserInfo, { loading: userInfoLoading, error: userInfoError }] =
    useUserInfoLazyQuery({
      onCompleted(data) {
        AuthService.setInitialized();

        if (data) {
          AuthService.setAuthenticated(true);
        }
      },
      onError() {
        AuthService.setInitialized();
      },
    });

  const isLoading = isAuthenticatedLoading || userInfoLoading;
  const isInitialized = isAuthenticatedData?.isInitialized;
  const isAuthenticated = isInitialized && isAuthenticatedData?.isAuthenticated;
  const hasError = !!userInfoError;

  if (!isInitialized && !isLoading && !hasError) {
    void getUserInfo();
  }

  return { isLoading, isAuthenticated, hasError };
};
