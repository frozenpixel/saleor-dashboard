import { ErrorTrackingFactory } from "./errorTracking";
import { SentryExtension } from "./extensions";

export const errorTracking = ErrorTrackingFactory(SentryExtension);
