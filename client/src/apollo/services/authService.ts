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
   * @private
   */
  private isInitializedVar = makeVar(false);

  /**
   * Reactive variable to track the authentication state.
   * @private
   */
  public readonly isAuthenticatedVar = makeVar(false);

  /**
   * Getter to check if the app is initialized.
   * @returns {boolean} Whether the app is initialized.
   */
  public get isInitialized() {
    return this.isInitializedVar();
  }

  /**
   * Getter to check if the user is authenticated.
   * @returns {boolean} Whether the user is authenticated.
   */
  public get isAuthenticated() {
    return this.isAuthenticatedVar();
  }

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
    this.isInitializedVar(true);
  }

  /**
   * Method to set the authentication state.
   * @param {boolean} value - Whether the user is authenticated.
   */
  public setAuthenticated(value: boolean) {
    this.isAuthenticatedVar(value);
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
