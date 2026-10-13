import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "308607159727-tnsmeedvbf1k34boic1kd8h5bj7ar7q4.apps.googleusercontent.com",
  iosClientId:
    "308607159727-48v0l7i7ea66rvj5pd197m3dnvgsdag6.apps.googleusercontent.com",
});

export function useGoogleAuth(onSuccess: (idToken: string) => void) {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      const idToken = result.data?.idToken;
      if (idToken) {
        onSuccess(idToken);
      }
    } catch (error) {
      console.log("Google sign-in error:", error);
    }
  };

  return { signIn };
}
