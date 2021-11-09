/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer3-section section section-fluid section-padding">
          <div className="container">
            <div className="row learts-mb-n40">
              <div className="col-xl-4 col-lg-5 col-12 learts-mb-40">
                <div className="widget-contact">
                  <p className="email">codetoangub06@gmail.com</p>
                  <p className="phone">(+84) 904 577 164</p>
                  <div className="app-buttons">
                    <a href="#"><img src="assets/images/others/android.png" alt="true" /></a>
                    <a href="#"><img src="assets/images/others/ios.jpg" alt="true" /></a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-7 col-12 learts-mb-40">
                <div className="row row-cols-sm-3 row-cols-1 learts-mb-n40">
                  <div className="col learts-mb-40">
                    <ul className="widget-list">
                      <li><a href="#">Men</a></li>
                      <li><a href="#">Women</a></li>
                      <li><a href="#">Accessories</a></li>
                      <li><a href="#">Flash sale</a></li>
                    </ul>
                  </div>
                  <div className="col learts-mb-40">
                    <ul className="widget-list">
                      <li><a href="#">About us</a></li>
                      <li><a href="#">Store location</a></li>
                      <li><a href="#">Contact</a></li>
                      <li><a href="#">Support Policy</a></li>
                      <li><a href="#">FAQs</a></li>
                    </ul>
                  </div>
                  <div className="col learts-mb-40">
                    <ul className="widget-list">
                      <li> <i className="fab fa-twitter" /> <a href="">Twitter</a></li>
                      <li> <i className="fab fa-facebook-f" /> <a href="">Facebook</a></li>
                      <li> <i className="fab fa-instagram" /> <a href="">Instagram</a></li>
                      <li> <i className="fab fa-youtube" /> <a href="">Youtube</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-12 learts-mb-40">
                <h5 className="widget-title mb-2">Newsletter</h5>
                <form id="mc-form" className="mc-form widget-subscibe2">
                  <input id="mc-email" autoComplete="off" type="email" placeholder="Enter your e-mail address" />
                  <button id="mc-submit" className="btn">subscibe</button>
                </form>
                {/* mailchimp-alerts Start */}
                <div className="mailchimp-alerts text-centre">
                  <div className="mailchimp-submitting" />{/* mailchimp-submitting end */}
                  <div className="mailchimp-success text-success" />{/* mailchimp-success end */}
                  <div className="mailchimp-error text-danger" />{/* mailchimp-error end */}
                </div>{/* mailchimp-alerts end */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer3-bottom section section-fluid section-padding pt-0">
    <div className="container">
      <div className="row align-items-end learts-mb-n40">
        <div className="col-md-4 col-12 learts-mb-40 order-md-2">
          <div className="widget-about text-center">
            <img src="assets/images/logo/logo.png" alt="true" />
          </div>
        </div>
        <div className="col-md-4 col-12 learts-mb-40 order-md-3">
          <div className="widget-payment text-center text-md-right">
            <img src="assets/images/others/pay.png" alt="true" />
          </div>
        </div>
        <div className="col-md-4 col-12 learts-mb-40 order-md-1">
          <div className="widget-copyright">
            <p className="copyright text-center text-md-left">© 2021 TTH. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </div> */}

      </div>
    );
  }
}

export default Footer;