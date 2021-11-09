const click = {
    cart:false,
    wishlist:false,
    over_lay:false,
    sibar:false,
    search:false,
    sidebarMobile:false,
}
const Click = (state = click, action) => {
    switch (action.type) {
        case "CART":
            return {...state,cart:!state.cart,over_lay:!state.over_lay}
        case "WISHLIST":
            return {...state,wishlist:!state.wishlist,over_lay:!state.over_lay}
        case "SEARCH":
            return {...state,search:!state.search}
        case "OFF_OVERLAY":
            return {...state,over_lay:!state.over_lay,cart:false,wishlist:false,sibar:false,sidebarMobile:false}
        case "SIBAR_MOBILE":
            return {...state,sidebarMobile:!state.sidebarMobile,over_lay:!state.over_lay}
        default:
            return state
    }
}
export default Click;