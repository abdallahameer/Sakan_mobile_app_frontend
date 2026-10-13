import axios from "axios";
import * as SecureStore from "expo-secure-store";

const PROD_URL = process.env.EXPO_PUBLIC_API_URL_PROD;
const DEV_URL = process.env.EXPO_PUBLIC_API_URL_DEV;
const USE_DEV = process.env.EXPO_PUBLIC_USE_DEV === "true";

const url = __DEV__ && USE_DEV ? DEV_URL : PROD_URL;

if (!url) {
  throw new Error(
    "API URL missing: check the EXPO_PUBLIC_API_URL_* values in .env",
  );
}

export const API_URL: string = url;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// ---------------------------------------------------------------------------
// Login token: kept in memory while the app runs AND saved on the phone,
// so you stay logged in after closing the app.
// Dev and production are separate backends, so each saves its own token.
// ---------------------------------------------------------------------------

const TOKEN_KEY = `maskan_token_${url === DEV_URL ? "dev" : "prod"}`;

let authToken: string | null = null;
let tokenLoaded: Promise<void> | null = null;

// Reads the saved token from the phone (only once, the first time it's needed).
function loadSavedToken(): Promise<void> {
  if (!tokenLoaded) {
    tokenLoaded = SecureStore.getItemAsync(TOKEN_KEY)
      .then((saved) => {
        if (authToken === null) authToken = saved;
      })
      .catch(() => {});
  }
  return tokenLoaded;
}

// Call with the token after login. Call with null to log out.
export const setAuthToken = async (token: string | null) => {
  authToken = token;
  tokenLoaded = Promise.resolve(); // no need to read the phone's copy any more
  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch {
    // saving failed: the token still works until the app is closed
  }
};

// Runs before EVERY request: wait until the saved token is loaded,
// then attach it. The backend's requireAuth looks for this header.
api.interceptors.request.use(async (config) => {
  await loadSavedToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
