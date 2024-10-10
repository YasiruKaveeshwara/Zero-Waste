// // App.js
// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home.js";
// import History from "./pages/WasteHistory.js";
// import Request from "./pages/WasteRequest.js";
// import { AuthContextProvider } from './context/AuthContext.js';
// import { ProductProvider } from './pages/ProductContext.js'; // Import the ProductProvider



// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthContextProvider>
//       <ProductProvider> {/* Wrap with ProductProvider */}
//           <Routes>
         
//             <Route path='/' element={<Home />} /> 
//             <Route path='/history' element={<History />} /> 
//             <Route path='/request' element={<Request />} /> 

//           </Routes>
//         </ProductProvider> {/* Close ProductProvider */}
//       </AuthContextProvider>
//     </BrowserRouter>
//   );
// }







// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/forms/ResidentLoginform.js';
import SignupForm from './components/forms/ResidentSignupForm.js';
import Home from "./pages/Home.js";
import Progress from "./pages/WasteRecycleProgress.js"
import History from "./pages/WasteHistory.js";
import Request from "./pages/WasteRequest.js";
import { AuthContextProvider } from './context/AuthContext.js';
import { ResidentProvider } from './pages/ResidentContext.js'; // Import the ProductProvider
import NonRegHome from "./pages/NonRegisteredHome.js";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <ResidentProvider> {/* Wrap with ProductProvider */}
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/resident-home' element={<Home />} /> 
            <Route path='/resident-history' element={<History />} /> 
            <Route path='/resident-request' element={<Request />} /> 
            <Route path='/resident-nonreghome' element={<NonRegHome />} /> 
            <Route path='/waste-progress' element={<Progress />} />
            <Route path='/resident-signup' element={<SignupForm />} /> 
           
          </Routes>
        </ResidentProvider> {/* Close ProductProvider */}
      </AuthContextProvider>
    </BrowserRouter>
  );
}
