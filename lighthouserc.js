/** @type {import('@lhci/utils/src/lighthouserc').Config} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready on",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/collections",
        "http://localhost:3000/contact",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2500, aggregationMethod: "median" },
        ],
        "first-contentful-paint": [
          "warn",
          { maxNumericValue: 1800, aggregationMethod: "median" },
        ],
        "cumulative-layout-shift": [
          "error",
          { maxNumericValue: 0.1, aggregationMethod: "median" },
        ],
        "total-blocking-time": [
          "warn",
          { maxNumericValue: 300, aggregationMethod: "median" },
        ],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
