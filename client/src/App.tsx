import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './app/layout/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './app/layout/LoadingComponent';
import { useAppDispatch } from './app/store/configureStore';
import { fetchBasketAsync } from './features/basket/basketSlice';
import { fetchCurrentUser } from './features/account/accountSlice';
import HomePage from './features/Home/HomePage';


function App() {
 const location = useLocation();
  const dispatch=useAppDispatch();
  const [loading, setLoading]=useState(true);

  const initApp = useCallback(async ()=>{
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());

    }catch(error){
      console.log(error);
    }
  },[dispatch])


  useEffect(()=>{
   
   initApp().then(()=>setLoading(false));
  },[initApp])

    const [darkMode, setDarkMode]=useState(false);
    const paletteType=darkMode ? 'dark' : 'light';
    const theme=createTheme({
      palette:{
        mode:paletteType,
        background:{
          default: paletteType=== 'light' ? '#eaeaea' : '#121212'
        }
      }
    })
  
    function handleThemeChange(){
      setDarkMode(!darkMode);
    }
    if(loading) return <LoadingComponent message='Incijalizacija app...'/>
        
  return (
  <ThemeProvider theme={theme}>
    <ToastContainer position='bottom-right' hideProgressBar theme="colored"/>
      <CssBaseline/>
      
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {loading ? <LoadingComponent message='Incijalizacija app...'/>
        :location.pathname === '/' ? <HomePage/>
        : <Container sx={{mt:4}}>
           <Outlet/>
            </Container>
      
    }
     
      
      
      </ThemeProvider>

  );
}

export default App;
