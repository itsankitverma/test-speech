"use client";

import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import VoiceToTextComponent from "@/components/voiceToText";

// Function to detect browser, device type, and OS
const getBrowserDeviceAndOSInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = "Unknown Browser";
  let device = "Desktop";
  let os = "Unknown OS";

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

  // Detect OS
  if (userAgent.includes("Win")) {
    os = "Windows";
  } else if (userAgent.includes("Mac")) {
    os = "MacOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = "iOS";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  }

  return { browser, device, os };
};

// Banner Component to display warning messages
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
    os: string;
  } | null>(null);

  useEffect(() => {
    setBrowserInfo(getBrowserDeviceAndOSInfo());
  }, []);

  return (
    <div>
      {/* Show banner if specific OS-browser combinations are detected */}
      {browserInfo &&
        ((browserInfo.os === "Windows" &&
          browserInfo.browser === "Mozilla Firefox") ||
          (browserInfo.os === "MacOS" &&
            browserInfo.browser === "Microsoft Edge")) && <BrowserBanner />}

      {/* Only show VoiceToTextComponent if on Chrome and Desktop */}
      {<VoiceToTextComponent />}

      <h1>
        You are using: {browserInfo?.browser} on {browserInfo?.device} with{" "}
        {browserInfo?.os}
      </h1>
    </div>
  );
};

export default BrowserDetection;
