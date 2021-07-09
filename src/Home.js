import { useState, useEffect } from 'react'
import ShoppingCart from './components/ShoppingCart'

// Test lint-staged for ESLint 80
const Home = () => {
  const config = {
    currency: 'RM',
    repoName: 'GitHub',
    repoUrl: 'https://github.com/tw-wong/react-shopping-cart',
    repoAuthor: 'tw-wong'
  }

  const [products, setProducts] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isCheckedAll, setIsCheckedAll] = useState(false)

  const updateProductQuantity = (index, type) => {
    // console.log('updateProductQuantity. index: %s, type: %s', index, type);

    const newProducts = [...products]

    if (type === 'plus') {
      newProducts[index].quantity += 1
    } else {
      newProducts[index].quantity -= 1
    }

    setProducts(newProducts)
  }

  const deleteProduct = (index) => {
    // console.log('deleteProduct. index: %s', index);

    const newProducts = [...products]
    newProducts[index].is_deleted = true
    setProducts(newProducts)
  }

  const checkItem = (index, checked) => {
    // console.log('checkItem. index: %s, checked: %s', index, checked);

    const newProducts = [...products]
    newProducts[index].is_checked = checked
    setProducts(newProducts)
  }

  const checkAllItem = (checked) => {
    const newProducts = [...products]
    // console.log('checkAllItem. checked: %s, newProducts:%o', checked, newProducts);

    newProducts.forEach((product) => {
      if (!product.is_deleted) {
        // newProducts[index].is_checked = checked;
        product.is_checked = checked
      }
    })

    setProducts(newProducts)
    setIsCheckedAll(checked)
  }

  const CheckOut = () => {
    return (
      <div className="row float-right clearfix">
        <span className="font-weight-bold">Total amount:&nbsp;</span>{' '}
        {config.currency + ' ' + totalAmount}
      </div>
    )
  }

  useEffect(() => {
    // calculate total amount
    let amount = 0
    let checked = false

    if (products) {
      products.forEach((product) => {
        if (!product.is_deleted && product.is_checked) {
          const subTotal = product.quantity * product.price
          amount += subTotal
        }
      })

      checked = true
      products.forEach((product) => {
        if (!product.is_deleted && !product.is_checked) {
          checked = false
        }
      })
    }

    amount = amount.toFixed(2)
    setTotalAmount(amount)
    setIsCheckedAll(checked)
  }, [products])

  // fetch data only on first render.
  useEffect(() => {
    const url =
      'https://my-json-server.typicode.com/tw-wong/vue-shopping-cart/products'

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data.')
        }
        return res.json()
      })
      .then((data) => {
        setIsPending(false)
        setProducts(data)
        setError(null)
      })
      .catch((err) => {
        setIsPending(false)
        // console.log(err.message);
        setError(err.message)
      })
  }, [])

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {products && (
        <ShoppingCart
          config={config}
          updateProductQuantity={updateProductQuantity}
          deleteProduct={deleteProduct}
          checkItem={checkItem}
          checkAllItem={checkAllItem}
          isCheckedAll={isCheckedAll}
          products={products}
        />
      )}
      {!isPending && !error && <CheckOut />}
    </div>
  )
}

export default Home
