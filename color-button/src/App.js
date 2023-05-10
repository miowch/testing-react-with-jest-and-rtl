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
      style={{backgroundColor: buttonColor}}
      disabled={disabled}
      onClick={() => setButtonColor(newButtonColor)}
      >
      Change to {newButtonColor}
      </button>
      <input 
      type="checkbox"
      onChange={ (e) => setButtonDisabled(e.target.checked)}
      />
    </div>
  );
}

export default App;
