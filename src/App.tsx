import { useState } from 'react';
import classes from './app.module.css';
import webLogo from './assets/logo/webpackLogoo.png';
import RCButton from './libs/atoms/button/Button';

export default function App() {
  const [input, setInput] = useState<string>('');
  console.log(process.env.USER_NAME, 'ENV File');
  return (
    <div>
      <h1 className={classes.heading}>Hello from React + Webpack Components Library</h1>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <img src={webLogo} alt='webPack Logo' className={classes.logo} />
      <RCButton variant='outline'>Add a new Book</RCButton>
    </div>
  );
}
