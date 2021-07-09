// import { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'

const ShoppingCart = (props) => {
  // const [isCheckedAll, setIsCheckedAll] = useState(false);

  // // debug only
  // useEffect(() => {
  //   console.log('useEffect. isCheckedAll:%s', isCheckedAll);
  //   console.log(props);

  // }, [props.products]);

  const checked = props.isCheckedAll ? 'checked' : ''
  // console.log('checked: %s, props.isCheckedAll:%s', checked, props.isCheckedAll)

  return (
    <div className="row">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              {
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => props.checkAllItem(e.target.checked)}
                />
              }
            </th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((item, index) => {
            return (
              !item.is_deleted && (
                <CartItem
                  key={index}
                  index={index}
                  config={props.config}
                  updateProductQuantity={props.updateProductQuantity}
                  deleteProduct={props.deleteProduct}
                  checkItem={props.checkItem}
                  item={item}
                />
              )
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShoppingCart
