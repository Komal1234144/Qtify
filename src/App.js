import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import {useEffect} from 'react';
import Header from "./Components/Header/Header";

const Routemaker = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <div style={{ height: "100%" }}>
      <Header />
      <Outlet/>
    </div>
  );
};

function App() {
  return (
   
   
        <BrowserRouter>
          <Routes>
            
            <Route path="/*" element={<Routemaker/>}>

            </Route>
           
          </Routes>
        </BrowserRouter>
    
  );
}

export default App;
