import * as React from 'react';
import { useState } from 'react';
import classes from './app.module.css';
import webLogo from './assets/logo/webpackLogoo.png';

const Button = React.lazy(() => import('components/RCButton'));

export default function App() {
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <h1 className={classes.heading}>Hello from React + Webpack</h1>
      <h2 className='text-2xl text-amber-400 font-poppins'>I am Pramit</h2>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <img src={webLogo} alt='webPack Logo' className={classes.logo} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Button variant='outline'>Add a button</Button>
      </React.Suspense>
    </div>
  );
}
