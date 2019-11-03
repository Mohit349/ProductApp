import React, { Component } from "react";
import { connect } from "react-redux";
import updateProduct from "./../actions";
import { pricingInfo } from "./../products";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            weight: "",
            availability: 0,
            productUrl: "",
            pricingTier: "",
            priceRange: "",
            isEditable: null
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    validate = data => {
        const error = {};
        const { name, weight, productUrl, pricingTier, priceRange, isEditable } = data;
        if (!name) {
            error.name = "Name is required";
        }
        if (!weight) {
            error.weight = "Weight is required";
        }
        if (!productUrl) {
            error.productUrl = "Product Url is required";
        }
        if (!pricingTier) {
            error.weight = "Price Tier is required";
        }
        if (!priceRange) {
            error.priceRange = "Price Range is required";
        }
        if (isEditable !== true && isEditable !== false) {
            error.isEditable = "Is Editable required";
        }
        return error;
    };

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state);
        const errorValues = Object.values(errors);
        if (errorValues.length) {
            alert(errorValues[0]);
        } else {
            console.log("onSubmit", this.state);
            this.props.updateProduct(this.state);
            this.props.history.push("/");
        }
    };

    componentDidMount() {
        const { products, match } = this.props;
        const productData = products[match.params.id];
        this.setState(productData);
    }
    priceRange = () => {
        const { pricingTier } = this.state;
        const arr = pricingTier ? pricingInfo[pricingTier] : [];
        return arr.map((el, i) => {
            return <option key={i}>{el}</option>
        })
    }
    render() {
        const { name, weight, availability, productUrl, pricingTier, priceRange, isEditable } = this.state;
        return (
            <div className="container" style={{marginTop:30}}>
            <h3>Edit Product</h3>
             <form onSubmit={this.onSubmit}>
             <div className="form-group">
             <label>
             Name:
             </label>
             <input 
              type="text"
              value={name} 
              className="form-control" 
              onChange={e=>{this.handleChange('name',e.target.value)}}/>
             </div>
             <div className="form-group">
             <label>
             Weight:
             </label>
             <input 
             type="text"
             value={weight}
             className="form-control" 
             onChange={e=>{this.handleChange('weight',e.target.value)}}/>
             </div>
             <div className="form-group">
             <label>
             Availability:
             </label>
             <input 
             type="number"
             value={availability}
             className="form-control"
             onChange={e=>{this.handleChange('availability',e.target.value)}}/>
             </div>
             <div className="form-group">
             <label>
             Product Url:
             </label>
             <input 
             type="text" 
             value={productUrl}
             className="form-control"
             onChange={e=>{this.handleChange('productUrl',e.target.value)}}/>
             </div>
             <div className="form-group">
             <label>Product Tier:</label>
             <br/>
             <label className="radio-inline"><input checked={pricingTier==="budget"}  type="radio" onChange={e=>{this.handleChange('pricingTier','budget')}}/>budget</label>
             <label className="radio-inline"><input checked={pricingTier==="premier"} type="radio" onChange={e=>{this.handleChange('pricingTier','premier')}} />premier</label>
             </div>
             <div className="form-group">
             <label>Price Range:</label>
             <select className="form-control" value={priceRange} onChange={e=>{this.handleChange('priceRange',e.target.value)}}>
             {this.priceRange()}
             </select>
             </div>
             <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isEditable}
              onChange={e=>{this.handleChange('isEditable',e.target.checked)}}
            />
            <label className="form-check-label">
              Is Editable
            </label>
          </div>
          <div className="form-group">
          <input className="btn btn-primary" type='submit' onClick={this.onSubmit}  />
          </div>
             </form>
             </div>

        )
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps, { updateProduct })(EditProduct);