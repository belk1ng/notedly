import { useUserInfoLazyQuery } from "@/apollo/generated/types";
import { AuthService } from "@/apollo/services";
import { useReactiveVar } from "@apollo/client";

export const useAuth = () => {
  const isInitialized = useReactiveVar(AuthService.isInitialized);

  const isAuthenticated = useReactiveVar(AuthService.isAuthenticated);

  const [
    getUserInfo,
    { loading: userInfoLoading, called: userInfoCalled, error: userInfoError },
  ] = useUserInfoLazyQuery({
    fetchPolicy: "network-only",
    onCompleted(data) {
      AuthService.setInitialized();

      if (data) {
        AuthService.setAuthenticated(true);
      }
    },
    onError() {
      AuthService.setInitialized();
      AuthService.setAuthenticated(false);
    },
  });

  const isAppInInitialState = !userInfoCalled && !isInitialized;

  if (isAppInInitialState) {
    void getUserInfo();
  }

  return {
    isLoading: userInfoLoading,
    isAuthenticated,
    hasError: !!userInfoError,
  };
};
