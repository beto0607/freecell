export const shuffleArray = <T extends Object>(array: T[]): T[] => {
    const output: T[] = [...array];
    let currentIndex: number = output.length;
    let randomIndex: number = 0;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [output[currentIndex], output[randomIndex]] = [output[randomIndex], output[currentIndex]];
    }

    return output;
};
