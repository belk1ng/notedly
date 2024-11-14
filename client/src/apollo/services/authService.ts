import { makeVar } from "@apollo/client";
import { AuthResponse } from "@/apollo/generated/types";

/**
 * Key for storing the access token in local storage.
 */
const ACCESS_TOKEN_PERSIST = "accessToken";

/**
 * Key for storing the refresh token in local storage.
 */
const REFRESH_TOKEN_PERSIST = "refreshToken";

type AuthPayloadTokens = Omit<AuthResponse, "__typename">;

/**
 * Class responsible for managing user authentication.
 */
class AuthenticationService {
  /**
   * Reactive variable to track the app initialization state.
   */
  public readonly isInitialized = makeVar(false);

  /**
   * Reactive variable to track the authentication state.
   */
  public readonly isAuthenticated = makeVar(false);

  /**
   * Getter to retrieve the access token from local storage.
   * @returns {string} The access token, or an empty string if not found.
   */
  public get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_PERSIST) ?? "";
  }

  /**
   * Getter to retrieve the refresh token from local storage.
   * @returns {string} The refresh token, or an empty string if not found.
   */
  public get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_PERSIST) ?? "";
  }

  /**
   * Method to sign in the user and update the tokens.
   * @param {AuthPayloadTokens} tokens - The tokens received from the authentication response.
   */
  public signIn(tokens: AuthPayloadTokens) {
    this.updateTokens(tokens);
    this.setAuthenticated(true);
  }

  /**
   * Method to set the app initialized.
   */
  public setInitialized() {
    this.isInitialized(true);
  }

  /**
   * Method to set the authentication state.
   * @param {boolean} value - Whether the user is authenticated.
   */
  public setAuthenticated(value: boolean) {
    this.isAuthenticated(value);
  }

  /**
   * Method to update the tokens in local storage.
   * @param {AuthPayloadTokens} tokens - The tokens to be stored.
   */
  public updateTokens(tokens: AuthPayloadTokens) {
    localStorage.setItem(ACCESS_TOKEN_PERSIST, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_PERSIST, tokens.refreshToken);
  }

  /**
   * Method to log out the user and clear the tokens.
   */
  public logout() {
    this.clearTokens();
    this.setAuthenticated(false);
  }

  /**
   * Method to clear the tokens from local storage.
   */
  public clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_PERSIST);
    localStorage.removeItem(REFRESH_TOKEN_PERSIST);
  }
}

/**
 * Singleton instance of the AuthenticationService.
 */
export const AuthService = new AuthenticationService();
