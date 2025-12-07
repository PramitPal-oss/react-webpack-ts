import { useState } from 'react';
import classes from './app.module.css';
import webLogo from './assets/logo/webpackLogoo.png';

export default function App() {
  const [input, setInput] = useState<string>('');
  console.log(process.env.USER_NAME, 'ENV File');
  return (
    <div>
      <h1 className={classes.heading}>Hello from React + Webpack</h1>
      <h2 className='text-2xl text-amber-400 font-poppins'>I am Pramit</h2>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <img src={webLogo} alt='webPack Logo' className={classes.logo} />
      <div className='flex gap-1.5'>
        <button
          type='button'
          className='text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Blue
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Green
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Cyan
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Teal
        </button>
        <button
          type='button'
          className='text-heading bg-linear-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Lime
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Red
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Pink
        </button>
        <button
          type='button'
          className='text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5'
        >
          Purple
        </button>
      </div>
    </div>
  );
}
