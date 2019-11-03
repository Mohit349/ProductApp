import React, { Component } from "react";
import _ from "lodash";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Product=(props)=>{
   return(
    <tr>
    <td>{props.product.name}</td>
    <td>{props.product.availability}</td>
    <td>{props.product.weight}</td>
    <td>{props.product.isEditable?<Link className="btn btn-primary" to={`/edit/${props.product.id}`}>Edit</Link>:null}</td>
    </tr>

    )
}
class Products extends Component {
   productList(){
    const {products}=this.props;
     return _.map(products,product=>{
        return <Product key={product.name} product={product}/>
     })
   }
    render() {
        return (

            <div className="container" style={{marginTop:50}}>
            <h3>Products</h3>
            <table className="table table-striped">
            <thead>
            <tr>
            <th>Name</th>
            <th>Availability</th>
            <th>Weight</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {this.productList()}
            </tbody>
            </table>
            </div>
        )
    }
    
}
const mapStateToProps=(state)=>{
       return state;
   }
export default connect(mapStateToProps)(Products);