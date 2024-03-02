const colors = [
    "#FBEAEA",
    "#E6EAF9",
    "#FBFAE5",
    "#E8F6FA",
    "#B7C9F2",
    "#FFCFDF",
];

function getRandomColor() {
    if (!colors || colors.length === 0) {
        throw new Error("Color array is empty or undefined");
    }

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}

export default getRandomColor;
