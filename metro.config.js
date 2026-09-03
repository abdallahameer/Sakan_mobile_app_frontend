const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add font file support
config.resolver.assetExts.push("ttf");

module.exports = withNativeWind(config, {
  input: "./src/global.css",
});
