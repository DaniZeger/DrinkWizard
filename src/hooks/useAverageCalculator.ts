import { useState } from "react";

function useAverageCalculator(initialNumbers: number[]) {
    const numbers = initialNumbers
    const calculateAverage: any = () => {
        const totalSum = numbers.reduce((sum, num) => sum + num, 0);
        const numElements = numbers.length;
        const average = totalSum / numElements;
        return average.toFixed(1);
    };

    return { numbers, calculateAverage };
}

export default useAverageCalculator;
