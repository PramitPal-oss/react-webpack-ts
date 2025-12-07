import { useCallback, useEffect, useState } from 'react';
import classes from './app.module.css';
import webLogo from './assets/logo/webpackLogoo.png';

export default function App() {
  const [input, setInput] = useState<string>('');
  const [products, setProducts] = useState<Array<any>>([]);
  console.log(process.env.USER_NAME, 'ENV File');

  const fetchAllProducts = useCallback(async () => {
    try {
      const response: Response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div>
      <h1 className={classes.heading}>Hello from React + Webpack</h1>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      <img src={webLogo} alt='webPack Logo' className={classes.logo} />
    </div>
  );
}
