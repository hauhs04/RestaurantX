import Topbar from './component/Topbar';
import Header from './component/Header';
import Sticky from './component/Sticky';
import MobileHeader from './component/MobileHeader';
import StickyMobileHeader from './component/StickyMobileHeader';
import Search from './component/Search';
import Wishlist from './component/Wishlist';
import Cart from './component/Cart';
import SibarMobile from './component/SibarMobile';
import ModerProduct from './component/ModerProduct';
import Footer from './component/Footer';
import Routerdom from './Router/Routerdom';
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from './component/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router>
      
        <Topbar></Topbar>
        <Header className="header-section section section-fluid bg-white d-none d-xl-block"></Header>
        <Sticky></Sticky>
        <MobileHeader className="mobile-header bg-white section d-xl-none"></MobileHeader>
        <StickyMobileHeader></StickyMobileHeader>
        <Search ></Search>
        <Wishlist></Wishlist>
        <Cart></Cart>
        <SibarMobile></SibarMobile>
        <Routerdom></Routerdom>
        <Footer></Footer>
        <ModerProduct></ModerProduct>
        <ScrollToTop></ScrollToTop>
    </Router>

  );
}

export default App
