// // Put this file at: lib/uploadStore.ts
// //
// // Holds the ad that is being uploaded OUTSIDE of any screen, so the upload keeps
// // going (and can be retried) after the user leaves the upload screen.
import { api } from "@/lib/api";
import { useSyncExternalStore } from "react";

export type UploadStatus =
  | "idle"
  | "uploading"
  | "saving"
  | "success"
  | "error";

export type UploadState = {
  status: UploadStatus;
  progress: number; // 0 to 100
  title: string; // the ad's title, shown in the banner
  error?: string;
};

export type UploadTask = {
  payload: Record<string, unknown>; // the ad fields
  images: string[]; // photo uris
  video?: string; // video uri
};

let state: UploadState = { status: "idle", progress: 0, title: "" };
let task: UploadTask | null = null;
let onSuccess: (() => void) | undefined;

const listeners = new Set<() => void>();

function setState(next: Partial<UploadState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// For components: re-renders whenever the upload changes
export function useUploadState(): UploadState {
  return useSyncExternalStore(subscribe, () => state);
}

export function isUploadBusy() {
  return state.status === "uploading" || state.status === "saving";
}

// Starts uploading an ad. Returns false if another upload is still running.
export function startUpload(newTask: UploadTask, whenDone?: () => void) {
  if (isUploadBusy()) return false;
  task = newTask;
  onSuccess = whenDone;
  void run();
  return true;
}

// Tries again with the same ad and files (after a failure)
export function retryUpload() {
  if (!task || isUploadBusy()) return;
  void run();
}

// Hides the banner (not possible while uploading)
export function dismissUpload() {
  if (isUploadBusy()) return;
  task = null;
  onSuccess = undefined;
  setState({ status: "idle", progress: 0, title: "", error: undefined });
}

async function run() {
  if (!task) return;
  const { payload, images, video } = task;

  setState({
    status: "uploading",
    progress: 0,
    title: String(payload.title ?? ""),
    error: undefined,
  });

  const form = new FormData();
  form.append("data", JSON.stringify(payload));

  images.forEach((uri, i) => {
    form.append("images", {
      uri,
      name: `photo-${i}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  if (video) {
    form.append("video", {
      uri: video,
      name: "video.mp4",
      type: "video/mp4",
    } as any);
  }

  try {
    await api.post("/properties", form, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (d) => d, // send the form as it is
      timeout: 600000, // 10 minutes: the upload now runs in the background
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.min(
          100,
          Math.round((event.loaded / event.total) * 100),
        );
        // at 100% everything has left the phone; the server is still saving
        setState({
          status: percent >= 100 ? "saving" : "uploading",
          progress: percent,
        });
      },
    });

    task = null;
    setState({ status: "success", progress: 100 });
    try {
      onSuccess?.();
    } catch {
      // a problem in the callback must not turn a success into a failure
    }
  } catch (error: any) {
    setState({
      status: "error",
      error:
        error?.response?.data?.error ??
        (error instanceof Error ? error.message : "حدث خطأ غير متوقع"),
    });
  }
}
