// Utility function to calculate distance between any two points
export function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Function to generate a normally distributed random number using the Box-Muller transform
export function generateNormalRandom(mean = 0, stdDev = 1) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
}

// Function to force a number to be within a specified range
export function clamp(value, min, max) {
    if (min > max) {
        console.error("Minimum value cannot be greater than maximum value");
        return value;
    } else {
        return Math.max(min, Math.min(max, value));
    }
}