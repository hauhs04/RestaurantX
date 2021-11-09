import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
class Contac extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAlert:false,
            name:"",
            mail:"",
            mes:"",
            type:"",
            title:"",
            type:"",
        }
    }
    Send=()=>{
        if(this.state.name.length<2 || this.state.mail.length <2 ||this.state.mes.length <2 ){
            return this.setState({showAlert:true,type:"error",title:"Không được spam bạn eey !"})
        }if(!this.state.mail.includes("@")){
            return this.setState({showAlert:true,type:"error",title:"Email ghi sai r !"})
        }
        return this.setState({showAlert:true,type:"success",title:"Gửi thành công",text:"Cảm ơn đã góp ý !!!!"})
    }
    isChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    render() {
        
        return (
            <div>
              {
                this.state.showAlert?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      text={this.state.text}
                                      // type="success"
                                      onConfirm={() => this.setState({ showAlert: false })}
                                    />:null
              }
                
<div className="section section-padding contac">
  <div className="container">
    <div className="section-title2 text-center">
      <h2 className="title">Keep in touch with us</h2>
    </div>
      {/* Contact Map Start */}
    <div className="row learts-mt-60">
      <div className="col">
            <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29802.418797361486!2d105.78727765796347!3d20.98051398042789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade1a3c1bb5d%3A0x5672057fb1892ed3!2zSOG7jWMgVmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1612615803869!5m2!1svi!2s" width={1170} height={500} frameBorder={0} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
      </div>
    </div>
    {/* Contact Map End */}
    {/* Section Title Start */}
    
    {/* Section Title End */}

    {/* Contact Information Start */}
    <div className="row learts-mb-n30">
      <div className="col-lg-4 col-md-6 col-12 learts-mb-30">
        <div className="contact-info">
          <h4 className="title">ADDRESS</h4>
          <span className="info"><i className="icon fal fa-map-marker-alt" /> Km 10 Nguyễn Trãi - Hà Đông - Hà Nội</span>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 learts-mb-30">
        <div className="contact-info">
          <h4 className="title">CONTACT</h4>
          <span className="info"><i className="icon fal fa-phone-alt" /> Mobile: 0987536020 <br /> Hotline: 0904577164</span>
          <span className="info"><i className="icon fal fa-envelope" /> Mail: <a href="#">codetoanbug06@gamil.com</a></span>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 learts-mb-30">
        <div className="contact-info">
          <h4 className="title"> HOUR OF OPERATION</h4>
          <span className="info"><i className="icon fal fa-clock" /> Cả tuần =)))</span>
        </div>
      </div>
    </div>
    {/* Contact Information End */}
    
  </div>
</div>





            <div className="section section-padding pt-0">
  <div className="container">
    {/* Section Title Start */}
    <div className="section-title2 text-center">
      <h2 className="title">Send a message</h2>
    </div>
    {/* Section Title End */}
    <div className="row">
      <div className="col-lg-8 col-12 mx-auto">
        <div className="contact-form">
          <form  id="contact-form" >
            <div className="row learts-mb-n30">
              <div className="col-md-6 col-12 learts-mb-30"><input onChange={(event)=>this.isChange(event)} type="text" placeholder="Your Name *" name="name" /></div>
              <div className="col-md-6 col-12 learts-mb-30"><input onChange={(event)=>this.isChange(event)} type="email" placeholder="Email *" name="mail" /></div>
              <div className="col-12 learts-mb-30"><textarea onChange={(event)=>this.isChange(event)} name="mes" placeholder="Message" defaultValue={""} /></div>
              <div className="col-12 text-center learts-mb-30"><button onClick={()=>this.Send()} type="button" className="btn btn-dark btn-outline-hover-dark">Submit</button></div>
            </div>
          </form>
          <p className="form-messege" />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
        );
    }
}

export default Contac;