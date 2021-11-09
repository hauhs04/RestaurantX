const local = {
    SanphamLocal:[],
    
}
if(!localStorage.getItem("SanPham")){
    localStorage.setItem("SanPham", JSON.stringify([]));
}else{
    local.SanphamLocal= JSON.parse(localStorage.getItem("SanPham"))
}


 

const Local = (state = local, action) => {
    switch (action.type) {
        case "UPDATE_LOCAL":
            return {...state,SanphamLocal:action.UPDATE_LOCAL}
        
        default:
            return state
    }
}
export default Local;