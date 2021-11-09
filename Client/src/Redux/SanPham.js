
const sanpham = {
    sanphams:[],
    categorys:[],
    tags:[],
    slices:[],
    brands:[],
    blogs:[],
    item:null,
    size:[],
    lengthBlog:null,
    itemBlog:null,
    lengthItem:null,
    checkScrollLoad:true,
    history:null
}



const Sanpham = (state = sanpham, action) => {
    switch (action.type) {
        case "GET_SANPHAM":
            return {...state,sanphams:action.GET_SANPHAM,lengthItem:action.LastLength,checkScrollLoad:true}
        case "GET_CATEGORY":
            return {...state,categorys:action.GET_CATEGORY}
        case "GET_SLICE":
            return {...state,slices:action.GET_SLICE}
        case "GET_TAG":
            return {...state,tags:action.GET_TAG}
        case "GET_BRAND":
            return {...state,brands:action.GET_BRAND}
        case "GET_BLOG":
            return {...state,blogs:action.GET_BLOG,lengthBlog:action.length}
        case "GET_SIZE":
            return {...state,size:action.GET_SIZE}
        case "GET_ITEM":
            return {...state,item:action.GET_ITEM}  
        case "GET_ITEMBLOG":
            return {...state,itemBlog:action.GET_ITEMBLOG}
        case "OFF_SCROLLLOAD":
            return {...state,checkScrollLoad:false}   
        case "HISTORY":
            return {...state,history:action.history}         
        default:
            return state
    }
}

export default Sanpham
