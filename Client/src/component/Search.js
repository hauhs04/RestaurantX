import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const getdataItem = async(req="") => await axios.get("/items"+req);
class Search extends Component {
    
    isChange=(e)=>{
        
        getdataItem("?title="+e.target.value).then((res)=> this.props.GET_SANPHAM(res.data.payload,res.data.LastLength))
    }
    search=(e)=>{
        if(e.key == 'Enter'){
            this.props.SEARCH()
            if(this.props.history){
                return this.props.history.push("/sanphams")
            }
        }
    }
    render() {
        return (
            <div id="offcanvas-search" className={this.props.search?"offcanvas offcanvas-search offcanvas-open":"offcanvas offcanvas-search"}>
                <div className="inner">
                <div className="offcanvas-search-form">
                    <button className="offcanvas-close" onClick={()=>this.props.SEARCH()}>×</button>
                    
                        <div className="row mb-n3">
                            <div className="col-lg-8 col-12 mb-3"><input onKeyPress={(event)=>this.search(event)} onChange={(event)=>this.isChange(event)} name="search" type="text" placeholder="Search Products..." /></div>
                        </div>
                    
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        search: state.QLClick.search,
        sanphams:state.QLSanpham.sanphams,
        history:state.QLSanpham.history
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SEARCH: () => {
            dispatch({type:"SEARCH"})
        },
        GET_SANPHAM: (GET_SANPHAM) => {
            dispatch({
                type:"GET_SANPHAM",
                GET_SANPHAM
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
