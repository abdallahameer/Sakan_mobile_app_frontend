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

const TOKEN_KEY = `maskan_token_${url === DEV_URL ? "dev" : "prod"}`;

let authToken: string | null = null;
let tokenLoaded: Promise<void> | null = null;

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

export const setAuthToken = async (token: string | null) => {
  authToken = token;
  tokenLoaded = Promise.resolve();
  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch {}
};

api.interceptors.request.use(async (config) => {
  await loadSavedToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Returns the saved login token, or null if the user is not logged in
export const getSavedToken = async (): Promise<string | null> => {
  await loadSavedToken();
  return authToken;
};
