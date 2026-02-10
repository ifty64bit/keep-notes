// Modern pastel note colors matching the theme system
const colors = [
    "oklch(0.92 0.05 350)", // Pink
    "oklch(0.92 0.05 250)", // Blue
    "oklch(0.95 0.06 90)", // Yellow
    "oklch(0.93 0.05 160)", // Mint
    "oklch(0.91 0.06 290)", // Lavender
    "oklch(0.93 0.06 50)", // Peach
];

function getRandomColor() {
    if (!colors || colors.length === 0) {
        throw new Error("Color array is empty or undefined");
    }

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}

export default getRandomColor;
