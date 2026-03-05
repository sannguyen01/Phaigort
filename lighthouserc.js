module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000/'],
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                // Hard gate — build FAILS if exceeded
                'categories:performance': ['error', { minScore: 0.9 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['error', { maxNumericValue: 200 }],
                // Aspirational KPI — build WARNS but does not fail
                'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
