import { useCallback, useEffect, useRef, useState } from "react";

export interface OrientationData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

type Compat = typeof window & {
  DeviceOrientationEvent: {
    requestPermission?: () => Promise<string>;
  };
};

export function useDeviceOrientation() {
  const dataRef = useRef<OrientationData>({ alpha: null, beta: null, gamma: null });
  const [hasData, setHasData] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // listen only once the user has granted access (via a real gesture → enable())
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: DeviceOrientationEvent) => {
      dataRef.current = { alpha: e.alpha, beta: e.beta, gamma: e.gamma };
      setHasData(true);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [enabled]);

  const enable = useCallback(() => {
    const w = window as Compat;
    if (
      "DeviceOrientationEvent" in window &&
      typeof w.DeviceOrientationEvent.requestPermission === "function"
    ) {
      // iOS 13+: must be called from a user gesture. We call enable() from the
      // AR button tap, so this counts as one.
      w.DeviceOrientationEvent.requestPermission()
        .then((res) => {
          if (res === "granted") setEnabled(true);
        })
        .catch(() => setEnabled(true));
    } else {
      setEnabled(true);
    }
  }, []);

  const disable = useCallback(() => setEnabled(false), []);

  return { dataRef, hasData, enabled, enable, disable };
}

export type CameraStatus = "idle" | "loading" | "granted" | "denied" | "error";

export function useARVideo(active: boolean) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>("idle");

  useEffect(() => {
    if (!active) {
      setStream(null);
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    let local: MediaStream | null = null;
    setStatus("loading");
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        local = s;
        setStream(s);
        setStatus("granted");
      })
      .catch(() => {
        if (!cancelled) setStatus("denied");
      });
    return () => {
      cancelled = true;
      local?.getTracks().forEach((t) => t.stop());
    };
  }, [active]);

  return { stream, status };
}
