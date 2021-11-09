import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import VND from './../function/ConverstVND';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import _ from 'lodash'
const SweetAlert = withSwalInstance(swal);
const getdataSize = async () => await axios.get("/sizes/");
const putWishlist = async (id, wishlist) => await axios.put("/users/" + id, { wishlist });
const getdata = async (id) => await axios.get("/items/" + id);
class ModerProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: null,
      colors: null,
      size: null,
      quantity: 0,
      collor: null,
      showAlert: false,
      type: null,
      title: null,
      collorbutton: null,
    }
  }
  componentDidMount() {
    Promise.all([
      
      getdataSize().then((res) => {
        this.setState({
          sizes: res.data.payload
        });
      })
    ])
  }
  isChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  AddCart = async (id) => {
    if (!this.props.item.size.includes(this.state.size)) {
      return this.setState({ showAlert: true, type: "error", title: "Bạn chưa chọn size", collorbutton: "#B24443" });
    }
    
    if (this.state.quantity < 1 || this.props.item.quantity < 1) {
      return this.setState({ showAlert: true, type: "error", title: "Bạn chưa chọn số lượng =))))", collorbutton: "#B24443" });
    }
    if (this.state.quantity > this.props.item.quantity) {
      return this.setState({ quantity: this.props.item.quantity, showAlert: true, type: "error", title: "Chỉ còn " + this.props.item.quantity + " sản phẩm  =))))", collorbutton: "#B24443" });
    }
    var datas = JSON.parse(localStorage.getItem("SanPham"))
    var data = {
      "_id": id,
      "size": this.state.size,
      "collor": this.state.collor,
      "quantity": this.state.quantity,
      "price": this.props.item.price_new,
      "img": this.props.item.imgs[0],
      "title": this.props.item.title,
    }
    var x = _.findKey(datas, {
      "_id": id,
      "size": this.state.size,
      // "collor": this.state.collor,
    })
    console.log(x);
    if (x) {
      var quantity = Number(this.state.quantity) + Number(datas[x].quantity)
      if (quantity > this.props.item.quantity) {
        return this.setState({ quantity: this.props.item.quantity, showAlert: true, type: "error", title: "Chỉ còn " + this.props.item.quantity + " sản phẩm  =))))", collorbutton: "#B24443" });
      }
      datas[x].quantity = quantity
    } else {
      datas.push(data)
    }
    localStorage.setItem("SanPham", JSON.stringify(datas))
    this.props.UPDATE_LOCAL(datas)
    return this.setState({ showAlert: true, type: "success", title: "Thêm vào giỏ hàng thành công =))))", collorbutton: "#B24443" });
  }

  Compare = () => {
    this.setState({
      showAlert: true,
      title: "Đang UPDATE modun",
      type: "warning",
      collorbutton: "#B24443"
    });
  }

  AddWishlist = (value) => {
    if (!this.props.user) {
      return this.setState({ showAlert: true, title: "Đăng nhập để sử dụng chức năng này", type: "warning", collorbutton: "#B24443" });
    }
    var wishlist = this.props.user.wishlist
    var WishlistLocal = this.props.WishlistLocal
    if (!wishlist.includes(value._id)) {
      wishlist.push(value._id)
      getdata(value._id).then((res) => WishlistLocal.push(res.data.payload))
    }
    putWishlist(this.props.user._id, wishlist).then((res) => {
      this.props.GET_USER(res.data.payload)
      this.props.UPDATE_WISHLIST(WishlistLocal)
      this.setState({ showAlert: true, title: "Success", type: "success", collorbutton: "#B24443" });
    })
  }
  render() {

    return (
      this.props.item ? <div className="quickViewModal modal fade" id="quickViewModal">
        {
          this.state.showAlert ? <SweetAlert
            show={true}
            title={this.state.title}
            type={this.state.type}
            confirmButtonColor={this.state.collorbutton}
            onConfirm={() => this.setState({ showAlert: false })}
          /> : null
        }

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="close" data-dismiss="modal">×</button>
            <div className="row learts-mb-n30">
              {/* Product Images Start */}
              <div id="moder" className="carousel slide col-lg-6 col-12 learts-mb-30" data-ride="carousel">

                <div className="carousel-inner">
                  {
                    this.props.item.imgs.map((value, key) => {
                      return <div key={key} className={key === 0 ? "carousel-item active" : "carousel-item "}>
                        <img src={value} alt="true" style={{maxHeight:'720px'}} />
                      </div>
                    })
                  }
                </div>
                {/* Left and right controls */}
                <a className="carousel-control-prev" href="#moder" data-slide="prev">
                  <i className="ti-angle-left" />
                </a>
                <a className="carousel-control-next" href="#moder" data-slide="next">
                  <i className="ti-angle-right" />
                </a>
              </div>
              {/* Product Images End */}
              {/* Product Summery Start */}
              <div className="col-lg-6 col-12 overflow-hidden learts-mb-30">
                <div className="product-summery customScroll">
                  <div className="product-ratings">
                    <span className="star-rating">
                      <span className="rating-active" style={{ width: this.props.item.rate * 100 / 5 + '%' }}>ratings</span>
                    </span>
                    <a href="#reviews" className="review-link">(<span className="count">{this.props.item.cmt.length}</span> đánh giá</a>
                  </div>
                  <h3 className="product-title">{this.props.item.title}</h3>
                  <div className="product-price">{this.props.item.sale > 0 ? (<><span className="product-price old">{VND(this.props.item.price_old)}</span><span className="product-price new">{VND(this.props.item.price_new)} VNĐ</span></>) : <span className="product-price new">{VND(this.props.item.price_new)} VNĐ</span>} </div>
                  <div className="product-description">
                    <p>{this.props.item.description}</p>
                  </div>
                  <div className="product-variations">
                    <table>
                      <tbody>
                        <tr>
                          <td className="label"><span>Size</span></td>
                          <td className="value">
                            <div className="product-sizes">
                              {
                                this.props.item.size.map((value, key) => {
                                  return this.state.sizes.map((value2, key2) => {
                                    if (value2._id == value) {
                                      return <div key={key2}>
                                        <input onChange={(event) => this.isChange(event)} type="radio" id={value} name="size" defaultValue={value} />
                                        <label htmlFor={value} ><a className={this.state.size == value ? "activesp" : null} >{value2.name}</a></label>
                                      </div>
                                    }
                                  })
                                }

                                )
                              }
                            </div>
                          </td>
                        </tr>
                        
                        <tr>
                          <td className="label"><span>Quantity</span></td>
                          <td className="value">
                            <div className="product-quantity">

                              {
                                this.props.item.quantity > 0 ? <>
                                  <input onChange={(event) => this.isChange(event)} type="number" name="quantity" min="0" className="input-qty" defaultValue={this.state.quantity} />
                                </> : "Hết hàng"
                              }

                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="product-buttons">
                    <a onClick={() => this.AddWishlist(this.state.item)} className="btn btn-icon btn-outline-body btn-hover-dark"><i className="fal fa-heart" /></a>
                    <a onClick={() => this.AddCart(this.props.item._id)} className="btn btn-dark btn-outline-hover-dark"><i className="fal fa-shopping-cart" /> Add to Cart</a>
                    <a onClick={() => this.Compare()} className="btn btn-icon btn-outline-body btn-hover-dark"><i className="fal fa-random" /></a>
                  </div>
                  <div className="product-brands">
                    <span className="title">Brands</span>
                    <div className="brands">
                      {
                        this.props.brands.map((value, key) => {
                          if (value._id == this.props.item.brand) {
                            return <Link key={key} to={"/sanphams"}><img src={value.img} alt="true" /></Link>
                          }
                        })
                      }
                    </div>
                  </div>
                  <div className="product-meta mb-0">
                    <table>
                      <tbody>
                        <tr>
                          <td className="label"><span>_ID</span></td>
                          <td className="value">{this.props.item._id}</td>
                        </tr>
                        <tr>
                          <td className="label"><span>Category</span></td>
                          <td className="value">
                            <ul className="product-category">
                              {
                                this.props.categorys.map((value, key) => {
                                  if (value._id == this.props.item.category) {
                                    return <li key={key}><Link to={"/sanphams"}>{value.name}</Link></li>
                                  }
                                })
                              }
                            </ul>
                          </td>
                        </tr>

                        <tr>
                          <td className="label"><span>Share on</span></td>
                          <td className="va">
                            <div className="product-share">
                              <a href="#"><i className="fab fa-facebook-f" /></a>
                              <a href="#"><i className="fab fa-twitter" /></a>
                              <a href="#"><i className="fab fa-google-plus-g" /></a>
                              <a href="#"><i className="fab fa-pinterest" /></a>
                              <a href="#"><i className="fal fa-envelope" /></a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Product Summery End */}
            </div>
          </div>
        </div>
      </div> : null
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    categorys: state.QLSanpham.categorys,
    brands: state.QLSanpham.brands,
    item: state.QLSanpham.item,
    user: state.QLUser.user,
    WishlistLocal: state.QLUser.WishlistLocal,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    UPDATE_LOCAL: (UPDATE_LOCAL) => {
      dispatch({
        type: "UPDATE_LOCAL",
        UPDATE_LOCAL
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModerProduct)
