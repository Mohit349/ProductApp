import { products } from "./../products";
import _ from "lodash";

const reducer = (state = _.mapKeys(products, "id"), action) => {

    switch (action.type) {
        case "UPDATE_PRODUCT":
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }

}
export default reducer;