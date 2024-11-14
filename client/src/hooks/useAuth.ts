import {
  useIsAuthenticatedQuery,
  useUserInfoLazyQuery,
} from "@/apollo/generated/types";
import { AuthService } from "@/apollo/services";

export const useAuth = () => {
  const { loading: isAuthenticatedLoading, data: isAuthenticatedData } =
    useIsAuthenticatedQuery();

  const [
    getUserInfo,
    { loading: userInfoLoading, called: userInfoCalled, error: userInfoError },
  ] = useUserInfoLazyQuery({
    fetchPolicy: "network-only",
    onCompleted(data) {
      if (data) {
        AuthService.setAuthenticated(true);
      }
    },
    onError() {
      AuthService.setAuthenticated(false);
    },
  });

  const isLoading = isAuthenticatedLoading || userInfoLoading;
  const isInitialized = isAuthenticatedData?.isInitialized;
  const isAuthenticated = isInitialized && isAuthenticatedData?.isAuthenticated;
  const hasError = !!userInfoError;

  const isAppInInitialState =
    !userInfoCalled && !isInitialized && !isLoading && !hasError;

  if (isAppInInitialState) {
    AuthService.setInitialized();
    void getUserInfo();
  }

  return { isLoading, isAuthenticated, hasError };
};
