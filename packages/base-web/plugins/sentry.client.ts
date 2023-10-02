import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { public: { sentry } } = useRuntimeConfig()

  if (!sentry.dsn) {
    return
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay({
        // Additional SDK configuration goes in here, for example:
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Configure this whole part as you need it!

    tracesSampleRate: 0.2, // Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', 'https://vsf2.tm8.co.uk'],

    replaysSessionSampleRate: 1.0, // Change in prod
    replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
    beforeSend (event, hint) {
      console.log("Sentry event:", event);
      console.log("Sentry hint:", hint);
      // event.tags = event.tags || {};
      // event.tags.os_info = getDetailedOS();
      return event;
    }
  });
});
