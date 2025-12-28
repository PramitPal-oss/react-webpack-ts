// import { RCButton, RCTextInput } from 'components/ui';

import React, { useState } from 'react';
import classes from './app.module.css';
import webLogo from './assets/logo/webpackLogoo.png';
// console.log('UI module', require('components/ui'));
const RCButton = React.lazy(() => import('components/ui').then((m) => ({ default: m.RCButton })));
const RCTextInput = React.lazy(() => import('components/ui').then((m) => ({ default: m.RCTextInput })));

export default function App() {
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <h1 className={classes.heading}>Hello from React + Webpack</h1>
      <h2 className='text-2xl text-amber-400 font-poppins'>I am Pramit Pal</h2>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <img src={webLogo} alt='webPack Logo' className={classes.logo} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <RCButton variant='subtle' size={'sm'} radius='md' color='red' onClick={() => console.log('Hello Brother')}>
          Add a button
        </RCButton>
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RCTextInput label='Hello Dev' description='Why it is here' radius='md' />
      </React.Suspense>
    </div>
  );
}
