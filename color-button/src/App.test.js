import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color, and updates when clicked', () => {
  render(<App />);

  // find an element with a role of button and text of "Change to blue"
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  // expect the background color to be red
  expect(colorButton).toHaveStyle({"background-color": 'red'})

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({"background-color": 'blue'})

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red')
});

test('initial conditions', () => {
  render(<App />);

  // check that button starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('button gets disabled by checkbox', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
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
  
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'red'});
});

test('button turns from grey to blue by checkbox', () => {
  render(<App />);
  
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({"background-color": 'blue'});
});
