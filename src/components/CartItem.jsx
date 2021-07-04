import React from 'react';

const CartItem = (props) => {
  // // debug only
  // useEffect(() => {
  //   console.log('useEffect. isCheckedAll:%s', isCheckedAll);
  // }, [isCheckedAll]);

  const checked = props.item.is_checked ? 'checked' : '';

  const isBtnDisabled = props.item.quantity > 0 ? false : true;
  // console.log('isBtnDisabled: %s, quantity: %s', isBtnDisabled, props.item.quantity);

  const subTotal = () => {
    const subTotal = (props.item.quantity * props.item.price).toFixed(2);
    // console.log('subTotal: %s', subTotal);

    return subTotal;
  }

  return (
    <tr>
      <th scope="row">
        <input
          type="checkbox"
          checked={checked}

          onChange={e => props.checkItem(props.index, e.target.checked)}
        />


      </th>
      <td> { props.config.currency + ' ' + props.item.price.toFixed(2) } </td>
      <td>
        <div>
          <div className="input-group">
            <span className="input-group-btn px-2">
                <button type="button" className="btn btn-default btn-number btn-minus"
                  onClick={() => props.updateProductQuantity(props.index, 'minus')} disabled={isBtnDisabled}>
                    <span className="octicon octicon-diff-removed">-</span>
                </button>
            </span>
            {/* :value="quantity" readonly="readonly" style="text-align: center" */}
            <input type="text" className="form-control input-number" readOnly="readonly" value={props.item.quantity} />

            <span className="input-group-btn px-2">
            {/* @click="update_quantity(index, 'plus')" :disabled="plus_disabled" */}
                <button type="button" className="btn btn-default btn-number btn-plus"
                  onClick={() => props.updateProductQuantity(props.index, 'plus')}>
                    <span className="glyphicon glyphicon-plus">+</span>
                </button>
            </span>
          </div>
        </div>
      </td>
      <td> { subTotal() } </td>
      <td> <button type="button" className="btn btn-secondary" onClick={() => props.deleteProduct(props.index)}>Remove item</button></td>
    </tr>
  );
}

export default CartItem;