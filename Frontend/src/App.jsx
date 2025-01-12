import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import AuthLayout from "./component/AuthLayout.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import Home from "./component/Home.jsx";
import {Toaster} from "react-hot-toast"

function App() {
  // console.log("App");
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

      {/* AuthLayout */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/home" element={<Home/>}/>
          
      </>
    )
  );

return  <>
  <RouterProvider router={router} />;
  <Toaster/> 
</> 

}

export default App;
