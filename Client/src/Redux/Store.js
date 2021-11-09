import Click from './CheckClick';
import Local from './LocalStorage';
import Sanpham from './SanPham';
import User from './User';

var redux = require ('redux');
var AllReducer = redux.combineReducers({
    QLSanpham:Sanpham,
    QLClick:Click,
    QLLocal:Local,
    QLUser:User
})



var store = redux.createStore(AllReducer);





export default store;