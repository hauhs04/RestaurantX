/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Item from './Items';
import Loading from './Loading';
const getdataItem = async () => await axios.get("/items");
const getdataItemSale = async () => await axios.get("/items?sale=1");
const getdataItemSeller = async () => await axios.get("/items?seller=1");
class ProdutSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLoad: false,
    }
  }

  componentDidMount() {
    if (this.props.sanphams.length == 0) {
      getdataItem().then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
  }
  GET_ITEM = () => {
    this.setState({ checkLoad: true });
    getdataItem().then((res) => {
      this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      this.setState({
        checkLoad: false
      });
    })
  }
  GET_ITEMSALE = () => {
    this.setState({ checkLoad: true });
    getdataItemSale().then((res) => {
      this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      this.setState({
        checkLoad: false
      });
    })
  }
  GET_ITEMSELLER = () => {
    this.setState({ checkLoad: true });
    getdataItemSeller().then((res) => {
      this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      this.setState({
        checkLoad: false,

      });
    })
  }
  render() {
    return (
      <div className="section section-fluid section-padding bg-white">
        <div className="container">
          {/* Product Tab Start */}
          <div className="row">
            <div className="col-12">
              <ul className="product-tab-list nav">
                <li><a onClick={() => this.GET_ITEM()} >Hàng mới</a></li>
                <li><a onClick={() => this.GET_ITEMSALE()}>Mặt hàng giảm giá</a></li>
                <li><a onClick={() => this.GET_ITEMSELLER()}>Đánh giá nhiều nhất</a></li>
              </ul>
              <div className="prodyct-tab-content1 tab-content">
                <div className="tab-pane fade show active" id="tab-new-sale">
                  {/* Products Start */}
                  {this.state.checkLoad ? <Loading></Loading> :
                    <div className="products row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                      <Item sanphams={this.props.sanphams} name={"col"}></Item>
                    </div>
                  }
                  {/* Products End */}
                </div>
                <div className="row learts-mt-50">
                  <div className="col text-center">
                    <Link to="/sanphams" className="btn btn-dark btn-hover-primary">Xem thêm</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Tab End */}
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    sanphams: state.QLSanpham.sanphams
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GET_SANPHAM: (GET_SANPHAM, LastLength) => {
      dispatch({
        type: "GET_SANPHAM",
        GET_SANPHAM,
        LastLength
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProdutSection)
