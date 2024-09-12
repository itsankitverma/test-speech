"use client";

import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import VoiceToTextComponent from "@/components/voiceToText";

// Function to detect browser and device type
const getBrowserAndDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = "Unknown Browser";
  let device = "Desktop";

  // Detect browser
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browser = "Google Chrome";
  } else if (userAgent.includes("Firefox")) {
    browser = "Mozilla Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Apple Safari";
  } else if (userAgent.includes("Edg")) {
    browser = "Microsoft Edge";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browser = "Opera";
  }

  // Detect device (mobile vs desktop)
  const mobileDevices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (mobileDevices.test(userAgent)) {
    device = "Mobile";
  }

  return { browser, device };
};

// Banner Component to display when not using Chrome or on mobile
const BrowserBanner = () => {
  return (
    <Alert className="bg-yellow-100 text-yellow-900 p-4 rounded-md shadow-lg">
      <AlertTitle className="text-xl font-bold">
        Browser or Device Warning
      </AlertTitle>
      <p>
        For better performance and user experience, we recommend switching to{" "}
        <strong>Google Chrome</strong> on a <strong>Desktop</strong>.
      </p>
    </Alert>
  );
};

const BrowserDetection = () => {
  const [browserInfo, setBrowserInfo] = useState<{
    browser: string;
    device: string;
  } | null>(null);

  useEffect(() => {
    setBrowserInfo(getBrowserAndDeviceInfo());
  }, []);

  return (
    <div>
      {/* Only show the banner if not using Chrome or if on mobile */}
      {browserInfo &&
        (browserInfo.browser !== "Google Chrome" ||
          browserInfo.device === "Mobile") && <BrowserBanner />}

      {/* Only show VoiceToTextComponent if on Chrome and Desktop */}
      {browserInfo &&
        browserInfo.browser === "Google Chrome" &&
        browserInfo.device === "Desktop" && <VoiceToTextComponent />}

      <h1>
        You are using: {browserInfo?.browser} on {browserInfo?.device}
      </h1>
    </div>
  );
};

export default BrowserDetection;
