import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StringCalculator from './StringCalculator';
 import App from './App'; 

test('renders the string calculator header', () => {
  render(<App />);
  const headerElement = screen.getByText(/String Calculator/i); // Update the text to match your UI
  expect(headerElement).toBeInTheDocument();
});

describe('StringCalculator', () => {
    test('renders the calculator', () => {
        render(<StringCalculator />);
        expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter numbers/i)).toBeInTheDocument();
        expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    });

    test('returns 0 for an empty string', async () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(await screen.findByText(/Result: 0/i)).toBeInTheDocument();
    });

    test('returns the number itself for a single number input', async () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(await screen.findByText(/Result: 1/i)).toBeInTheDocument();
    });

    test('returns the sum for two comma-separated numbers', async () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1,5' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(await screen.findByText(/Result: 6/i)).toBeInTheDocument();
    });

    // Uncomment to re-enable tests
    // test('handles new lines between numbers', async () => {
    //     render(<StringCalculator />);
    //     fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1\n2,3' } });
    //     fireEvent.click(screen.getByText(/Calculate/i));
    //     expect(await screen.findByText(/Result: 6/i)).toBeInTheDocument();
    // });

    // test('supports different delimiters', async () => {
    //     render(<StringCalculator />);
    //     fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '//;\n1;2' } });
    //     fireEvent.click(screen.getByText(/Calculate/i));
    //     expect(await screen.findByText(/Result: 3/i)).toBeInTheDocument();
    // });

    test('throws an exception for negative numbers', async () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1,-2,3' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(await screen.findByText(/Result: Negatives not allowed: -2/i)).toBeInTheDocument();
    });

    test('throws an exception for multiple negative numbers', async () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '-1,-2,3' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(await screen.findByText(/Result: Negatives not allowed: -1, -2/i)).toBeInTheDocument();
    });
});
