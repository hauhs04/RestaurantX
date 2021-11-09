import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ER_404 from '../Page/ER_404';
import Product from '../Page/Products';
import ViewCart from '../Page/ViewCart';
import CheckOut from '../Page/CheckOut';
import Login from '../Page/Login';
import Dashbroad from '../Page/Dashbroad';
import Wishlist from '../Page/Wishlist';
class Routerdom extends Component {
    render() {
        return (
                <Switch>
                    <Route path='/sanphams'exact  component={Product}/>
                    <Route path='/cart'  component={ViewCart}/>
                    <Route path='/checkout'  component={CheckOut}/>
                    <Route path='/login'  component={Login}/>
                    <Route path='/dashbroad'  component={Dashbroad}/>
                    <Route path='/wishlist'  component={Wishlist}/>
                    <Route path="*" component={ER_404} />
                </Switch>
            
        );
    }
}

export default Routerdom;