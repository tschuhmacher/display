/* eslint-disable no-console */

import { register } from "register-service-worker";

function isIosOrMac() {
  let macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];

  if (
    macosPlatforms.indexOf(window.navigator.platform) !== -1 ||
    iosPlatforms.indexOf(window.navigator.platform) !== -1
  ) {
    return true;
  } else {
    return false;
  }
}

if (process.env.NODE_ENV === "production" && !isIosOrMac()) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
