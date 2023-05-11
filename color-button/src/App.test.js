import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color, and updates when clicked', () => {
  render(<App />);

  // find an element with a role of button and text of "Change to blue"
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue'})

  // expect the background color to be red
  expect(colorButton).toHaveStyle({"background-color": 'MediumVioletRed'})

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({"background-color": 'MidnightBlue'})

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')
});

test('initial conditions', () => {
  render(<App />);

  // check that button starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('button gets disabled by checkbox', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  // select checkbox
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();

  // uncheck checkbox
  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
  
});

test('button turns from grey to red by checkbox', () => {
  render(<App />);
  
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'MediumVioletRed'});
});

test('button turns from grey to blue by checkbox', () => {
  render(<App />);
  
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'MidnightBlue'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  })
});