import { Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home'
import Footer from './pages/Footer'

function App() {
  return (
    <div>
        <Layout />
        <Home />
        <Footer />
      
    </div>
  );
}

export default App;
