function deepFreeze(obj) {
    // Only freeze objects
    if (
        obj === null ||
        typeof obj !== "object"
    ) {
        return obj;
    }

    // Freeze the current object
    Object.freeze(obj);

    // Recursively freeze nested objects
    for (const value of Object.values(obj)) {
        if (
            value !== null &&
            typeof value === "object" &&
            !Object.isFrozen(value)
        ) {
            deepFreeze(value);
        }
    }

    return obj;
}

const config = deepFreeze({
    api: {
        baseUrl: "https://x.com",
        retries: 3
    },
    debug: false
});

config.api.baseUrl = "https://changed.com";
config.debug = true;

console.log(config.api.baseUrl, config.debug);
// "https://x.com" false

console.log(Object.isFrozen(config.api));
// true