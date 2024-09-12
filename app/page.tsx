"use client";

import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import VoiceToTextComponent from "@/components/voiceToText";
import UAParser from "ua-parser-js";

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

  const getBrowserDeviceAndOSInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    const browser = result.browser.name || "Unknown Browser";
    const device = result.device.type ? result.device.type : "Desktop";
    const os = result.os.name || "Unknown OS";

    return { browser, device, os };
  };

  useEffect(() => {
    (function name() {
      const data = getBrowserDeviceAndOSInfo();
      console.log("data", data);
    })();
  }, []);

  useEffect(() => {
    setBrowserInfo(getBrowserDeviceAndOSInfo());
  }, []);

  return (
    <div>
      {/* Show banner if specific OS-browser combinations are detected */}
      {browserInfo &&
        ((browserInfo.browser === "Edge" &&
          (browserInfo.os === "Mac OS" || browserInfo.os === "iOS")) ||
          (browserInfo.browser === "Firefox" &&
            browserInfo.os === "Windows")) && <BrowserBanner />}

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
