import React, { useState } from 'react';

const add = (numbers) => {
    if (numbers === '') return 0;

    const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
    let delimiter = ',';
    if (delimiterMatch) {
        delimiter = delimiterMatch[1];
        numbers = numbers.split('\n').slice(1).join('\n'); 
    }
    const numList = numbers.split(new RegExp(`[${delimiter}\n]`));

    const negatives = numList.filter(num => parseInt(num) < 0);
    if (negatives.length) {
        throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    return numList.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
};

const StringCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleCalculate = () => {
        try {
            const sum = add(input);
            setResult(sum);
        } catch (error) {
            setResult(error.message);
        }
    };

    return (
        <div>
            <h1>String Calculator</h1>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Enter numbers" 
            />
            <button onClick={handleCalculate}>Calculate</button>
            <div>Result: {result}</div>
        </div>
    );
};

export default StringCalculator;
