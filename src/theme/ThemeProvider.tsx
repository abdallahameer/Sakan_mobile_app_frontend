import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";

const THEME_STORAGE_KEY = "sakan-dark-mode";

async function getStoredTheme() {
  if (Platform.OS === "web") {
    return typeof localStorage === "undefined"
      ? null
      : localStorage.getItem(THEME_STORAGE_KEY);
  }
  return SecureStore.getItemAsync(THEME_STORAGE_KEY);
}

async function storeTheme(enabled: boolean) {
  if (Platform.OS === "web") {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, String(enabled));
    }
    return;
  }
  await SecureStore.setItemAsync(THEME_STORAGE_KEY, String(enabled));
}

const COLORS = {
  light: {
    background: "#F0F1FA",
    surface: "#FFFFFF",
    elevatedSurface: "#F8F9FA",
    text: "#0F113C",
    secondaryText: "#6B7280",
    border: "#E5E7EB",
    primary: "#0F113C",
    primaryText: "#FFFFFF",
    accent: "#10B981",
  },
  dark: {
    background: "#0B0D1D",
    surface: "#17192D",
    elevatedSurface: "#22243A",
    text: "#F3F4F6",
    secondaryText: "#A1A1AA",
    border: "#36384D",
    primary: "#2D3158",
    primaryText: "#FFFFFF",
    accent: "#10B981",
  },
} as const;

type ThemeColors = (typeof COLORS)["light"] | (typeof COLORS)["dark"];

type ThemeContextValue = {
  isDarkMode: boolean;
  setDarkMode: (enabled: boolean) => Promise<void>;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function getSelectionStyle(
  selected: boolean,
  isDarkMode: boolean,
  colors: ThemeColors,
) {
  return {
    borderColor: selected
      ? isDarkMode
        ? "#60A5FA"
        : "#1e40af"
      : colors.border,
    backgroundColor: selected
      ? isDarkMode
        ? "#1E3A5F"
        : "#dbeafe"
      : colors.surface,
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { setColorScheme } = useColorScheme();
  const setColorSchemeRef = useRef(setColorScheme);
  setColorSchemeRef.current = setColorScheme;

  useEffect(() => {
    let isMounted = true;

    getStoredTheme()
      .then((savedMode) => {
        if (isMounted) {
          const enabled = savedMode === "true";
          setIsDarkMode(enabled);
          setColorSchemeRef.current(enabled ? "dark" : "light");
        }
      })
      .catch((error) => {
        console.error("Failed to load theme preference:", error);
        setColorSchemeRef.current("light");
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setDarkMode = useCallback(async (enabled: boolean) => {
    setIsDarkMode(enabled);
    setColorSchemeRef.current(enabled ? "dark" : "light");
    try {
      await storeTheme(enabled);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      isDarkMode,
      setDarkMode,
      colors: isDarkMode ? COLORS.dark : COLORS.light,
    }),
    [isDarkMode, setDarkMode],
  );

  if (!isReady) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
