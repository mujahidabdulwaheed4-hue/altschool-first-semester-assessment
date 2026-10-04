function diffObjects(oldObj, newObj) {
    const result = {
        added: {},
        removed: {},
        changed: {}
    };

    const oldKeys = new Set(Object.keys(oldObj));
    const newKeys = new Set(Object.keys(newObj));

    // Find added and changed properties
    for (const key of newKeys) {
        if (!oldKeys.has(key)) {
            result.added[key] = newObj[key];
        } else if (oldObj[key] !== newObj[key]) {
            result.changed[key] = {
                from: oldObj[key],
                to: newObj[key]
            };
        }
    }

    // Find removed properties
    for (const key of oldKeys) {
        if (!newKeys.has(key)) {
            result.removed[key] = oldObj[key];
        }
    }

    return result;
}

console.log(
    diffObjects(
        {
            name: "Setemi",
            role: "Engineer",
            country: "Jamaica"
        },
        {
            name: "Setemi",
            role: "Senior Engineer",
            city: "Kingston"
        }
    )
);

// {
//     added: { city: 'Kingston' },
//     removed: { country: 'Jamaica' },
//     changed: {
//         role: {
//             from: 'Engineer',
//             to: 'Senior Engineer'
//         }
//     }
// }