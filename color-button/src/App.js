import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [ buttonColor, setButtonColor ] = useState('red');
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const [ disabled, setButtonDisabled] = useState(false);

  return (
    <div >
      <button 
      style={{backgroundColor: disabled ? 'gray' : buttonColor}}
      disabled={disabled}
      onClick={() => setButtonColor(newButtonColor)}
      >
      Change to {newButtonColor}
      </button>
      <input 
      type="checkbox"
      id='disable-button-checkbox'
      onChange={ (e) => setButtonDisabled(e.target.checked)}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
