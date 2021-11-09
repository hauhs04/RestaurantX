/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug';
import Item from '../component/Items';
import Loading from '../component/Loading';
import VND from './../function/ConverstVND'
import InfiniteScroll from "react-infinite-scroll-component";
const getdataItem = async (req = "") => await axios.get("/items" + req);
const getdataItemSize = async (size, req) => await axios.get("/items?size=" + size + req);
const getdataSize = async () => await axios.get("/sizes/");
const getdataCollor = async () => await axios.get("/colors/");
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      sizes: [],
      colors: [],
      ItemsOfCategory: [],
      checkLoading: true,
      req: "",
      ratecaonhat: [],
      CheckLength: true,

    }
  }

  componentDidMount() {
    Promise.all([
      this.props.sanphams.length == 0 ? getdataItem().then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      }) : null,
      getdataSize().then((res) => this.setState({ sizes: res.data.payload })),
      getdataCollor().then((res) => this.setState({ colors: res.data.payload })),
      getdataItem("?rate=1").then((res) => this.setState({ ratecaonhat: res.data.payload }))
    ]).then(() => this.setState({ checkLoading: false }))

  }
  isCheck = () => {
    this.setState({
      check: !this.state.check
    });
  }
  isChange = async (e) => {
    await this.setState({ req: "&title=" + e.target.value, checkLoading: true });
    await getdataItem("?title=" + e.target.value).then((res) => {
      this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
    })
    await this.setState({ checkLoading: false });
  }
  themsp = () => {
    if (this.props.lengthItem == this.props.sanphams.length) {
      return this.props.OFF_SCROLLLOAD()
    }
    this.setState({ checkLoading: true });
    getdataItemSize(this.props.sanphams.length + 10, this.state.req).then((res) => {
      this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
    })
    setTimeout(() => { this.setState({ checkLoading: false }) }, 500)
  }
  GET_DATA = async (req, id) => {
    await this.setState({ checkLoading: true });
    if (req == 0) {
      this.setState({ req: "" });
      await getdataItem().then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 1) {//sort sp sale
      this.setState({ req: "&sale=1" });
      await getdataItem("?sale=1").then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 2) {//sort sp hot
      this.setState({ req: "&hot=1" });
      await getdataItem("?hot=1").then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 3) {//tim sp theo danh muc
      this.setState({ req: "&category=" + id });
      await getdataItem("?category=" + id).then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 4) {// rate
      this.setState({ req: "&rate=1", check: false });
      await getdataItem("?rate=1").then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 5) {//sort thap den cao
      this.setState({ req: "&sortprice=2", check: false });
      await getdataItem("?sortprice=2").then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 6) {//sort cao den thap
      this.setState({ req: "&sortprice=1", check: false });
      await getdataItem("?sortprice=1").then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 7) {//tim sp theo danh muc
      this.setState({ req: "&color=" + id, check: false });
      await getdataItem("?color=" + id).then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    if (req == 8) {//tim sp theo danh muc
      this.setState({ req: "&brand=" + id, check: false });
      await getdataItem("?brand=" + id).then((res) => {
        this.props.GET_SANPHAM(res.data.payload, res.data.LastLength)
      })
    }
    await this.setState({ checkLoading: false });
  }
  render() {
    return (
      <div>
        {this.state.checkLoading ? <Loading></Loading> : null}
        <div className="section section-padding pt-0">
          {/* Shop Toolbar Start */}
          <div className="shop-toolbar border-bottom">
            <div className="container">
              <div className="row learts-mb-n20">
                {/* Isotop Filter Start */}
                <div className="col-md col-12 align-self-center learts-mb-20">
                  <div className="isotope-filter shop-product-filter" >
                    <button >Tất cả sản phẩm</button>
                    <button >Sản phẩm HOT</button>
                    <button >Sale</button>
                  </div>
                </div>
                {/* Isotop Filter End */}
                
              </div>
            </div>
          </div>
          {/* Shop Toolbar End */}
          {/* Product Filter Start */}
          <div id="product-filter" className="product-filter bg-light" style={{ display: this.state.check ? 'block' : 'none' }}>
            <div className="container">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 learts-mb-n30">
                {/* Sort by Start */}
                <div className="col learts-mb-30">
                  <h3 className="widget-title product-filter-widget-title">Sort by</h3>
                  <ul className="widget-list product-filter-widget customScroll">
                    <li><a >Đánh giá cao nhất</a></li>
                    <li><a >Giá: thấp đến cao</a></li>
                    <li><a>Giá: cao đến thấp</a></li>
                  </ul>
                </div>
                {/* Sort by End */}
               
                {/* Brands Start */}
                <div className="col learts-mb-30">
                  <h3 className="widget-title product-filter-widget-title">Thương hiệu</h3>
                  <ul className="widget-list product-filter-widget customScroll">
                    {
                      this.props.brands.map((value, key) => {
                        return <li key={key}><a >{value.name}</a></li>
                      })
                    }
                  </ul>
                </div>
                {/* Brands End */}
              </div>
            </div>
          </div>
          {/* Product Filter End */}
          <div className="section learts-mt-70">
            <div className="container">
              <div className="row learts-mb-n50">
                <div className="col-lg-9 col-12 learts-mb-50 order-lg-2">
                  {/* Products Start */}
                  {/* <div id="shop-products" className="products isotope-grid row row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1"> */}
                  <InfiniteScroll
                    dataLength={this.props.sanphams}
                    next={this.themsp}
                    hasMore={this.props.lengthItem}
                    loader={<h4 className="loadding2">Loading...</h4>}
                    className="products isotope-grid row row-cols-xl-3 row-cols-md-3 row-cols-sm-2 row-cols-1"
                    id="shop-products"
                  >
                    <Item sanphams={this.props.sanphams} name={"col"}></Item>
                  </InfiniteScroll>
                  {/* </div> */}
                  {/* Products End */}
                  <div className="text-center learts-mt-70">
                    {this.props.lengthItem != this.props.sanphams.length ? <a onClick={() => this.themsp()} className="btn btn-dark btn-outline-hover-dark"><i className="ti-plus" /> Xem thêm </a> : null}
                  </div>
                </div>
                <div className="col-lg-3 col-12 learts-mb-10 order-lg-1">
                  {/* Search Start */}
                  <div className="single-widget learts-mb-40">
                    <div className="widget-search">
                      <form >
                        <input type="text" onChange={(event) => this.isChange(event)} name="search" placeholder="Search products...." />
                        <button type="reset"><i className="fal fa-search" /></button>
                      </form>
                    </div>
                  </div>
                  {/* Search End */}
                  {/* Categories Start */}
                  <div className="single-widget learts-mb-40">
                    <h3 className="widget-title product-filter-widget-title">Danh mục</h3>
                    <ul className="widget-list">
                      {
                        this.props.categorys.map((value, key) => {
                          return <li key={key}><a >{value.name}</a> </li>
                        })
                      } 
                    </ul>
                  </div>
                  {/* Categories End */}

                  {/* List Product Widget Start */}
                  <div className="single-widget learts-mb-40">
                    <h3 className="widget-title product-filter-widget-title">Đánh giá cao nhất</h3>
                    <ul className="widget-products">
                      {
                        this.state.ratecaonhat.map((value, key) => {
                          if (key < 4)
                            return <li key={key} className="product">
                              <div className="thumbnail">
                                <Link to={"sanpham." + slug(value.title) + "." + value._id}><img src={value.imgs[0]} alt="List product" /></Link>
                              </div>
                              <div className="content">
                                <h6 className="title"><Link to={"sanpham." + slug(value.title) + "." + value._id}>{value.title}</Link></h6>
                                <span className="price">
                                  {value.sale > 0 ? (<><span className="old">{VND(value.price_old)}</span><span className="new">{VND(value.price_new)}</span></>) : VND(value.price_new)} VNĐ
                                </span>
                                <div className="ratting">
                                  <span className="rate" style={{ width: value.rate * 100 / (5 * value.cmt.length) + '%' }} />
                                </div>
                              </div>
                            </li>
                        })
                      }
                    </ul>
                  </div>
                  {/* List Product Widget End */}

                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sanphams: state.QLSanpham.sanphams,
    categorys: state.QLSanpham.categorys,
    brands: state.QLSanpham.brands,
    lengthItem: state.QLSanpham.lengthItem,
    checkScrollLoad: state.QLSanpham.checkScrollLoad
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
    },
    OFF_SCROLLLOAD: () => {
      dispatch({
        type: "OFF_SCROLLLOAD"
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)
