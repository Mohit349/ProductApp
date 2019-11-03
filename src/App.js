import React from 'react';
import Products from "./containers/Products.js"
import EditProduct from "./containers/EditProduct";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer from "./reducers";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const store = createStore(reducer);

function App() {
    return (
    <Provider store={store}>
  	<BrowserRouter>
  	<Switch>
  	<Route exact path="/" component={Products} />
  	<Route path="/edit/:id" component={EditProduct} />
  	</Switch>
    </BrowserRouter>
    </Provider>
    );
}

export default App;