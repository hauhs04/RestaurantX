import axios from 'axios'
import { get } from 'js-cookie'
const user = {
    SignedCookie:null,
    user:null,
    WishlistLocal:[],
}
const getUser = async() => await axios.get("/users/get/user")
const getSanpham = async(id) => await axios.get("/items/"+id)
if(get("userEmail")){
    getUser().then(async(res)=>{
        user.user= await res.data.payload
        await res.data.payload.wishlist.map((value)=>{
            return getSanpham(value).then((res)=>{user.WishlistLocal.push(res.data.payload);localStorage.setItem("Wishlist", JSON.stringify(user.WishlistLocal))})
        })
    }).catch()
}

const User = (state = user, action) => {
    
    switch (action.type) {
        case "GET_USER":
            return {...state,user:action.GET_USER}
        case "UPDATE_WISHLIST":
            return {...state,WishlistLocal:action.UPDATE_WISHLIST}
        default:
            return state
    }
}
export default User