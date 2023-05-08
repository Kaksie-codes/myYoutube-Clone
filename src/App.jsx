import { useEffect, useState ,lazy, Suspense } from 'react';
import './App.css'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homescreen/HomeScreen'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/loginscreen/LoginScreen'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { useNavigate } from 'react-router';
import SearchScreen from './screens/searchScreen/SearchScreen';
import WatchScreen from './screens/watchscreen/WatchScreen';



const Layout = ({ children, sidebarOpen, handleToggleSidebar }) => {
 
  return (
    <>      
      <div className="container">
        <div className="main__content">
          <Sidebar sidebarOpen={sidebarOpen} handleToggleSidebar={handleToggleSidebar}/>        
          {children}
        </div>       
      </div>
    </>
  )
}



function App() {  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [sidebarOpen, toggleSidebar] = useState(false);  
  const handleToggleSidebar = () => {
    toggleSidebar(!sidebarOpen);
    console.log('clicked')
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        // console.log(userAuth)
        dispatch(login({
          name: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL,
          accessToken: userAuth.accessToken,
          userId: userAuth.uid
        }))
        setIsLoggedIn(true)
        // navigate('/')
      }else{
          dispatch(logout())
          setIsLoggedIn(false)
          navigate("/auth"); 
      }
    });
    return unsubscribe;
  },[dispatch])
  


  return (
    <div className='app'>
      {isLoggedIn && <Header handleToggleSidebar={handleToggleSidebar}/>}
      <Routes>
      {
        isLoggedIn ? (
          <>
            <Route index element={<HomeScreen sidebarOpen={sidebarOpen} handleToggleSidebar={handleToggleSidebar}/>}/>
            <Route path='/search/:query' element={<Layout sidebarOpen={sidebarOpen} handleToggleSidebar={handleToggleSidebar}><SearchScreen/></Layout>}/>
            <Route path='/watch/:id' element={<Layout sidebarOpen={sidebarOpen} handleToggleSidebar={handleToggleSidebar}><WatchScreen/></Layout>}/>      
          </>
        ) : (
          <Route path='/auth' element={<LoginScreen/>}/>
        )
      }  
      <Route path='*' element={<HomeScreen handleToggleSidebar={handleToggleSidebar}/>}/>
    </Routes>
    </div>
    
  )
}

export default App
