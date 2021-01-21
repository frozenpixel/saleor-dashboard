import * as Sentry from "@sentry/react";

import { ExtensionFactory, ExtensionMethods } from "../types";

export const SentryExtension: ExtensionFactory = () => {
  const init: ExtensionMethods["init"] = () => {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN
      });
      return true;
    }
    return false;
  };

  const setUserData: ExtensionMethods["setUserData"] = userData =>
    Sentry.setUser(userData);

  const captureException: ExtensionMethods["captureException"] = (e: Error) =>
    Sentry.captureException(e);

  return {
    captureException,
    init,
    setUserData
  };
};
