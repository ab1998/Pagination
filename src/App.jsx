import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCatalog from './ProductCatalog'
//In order to handle pagination.length from backend replace totalpages with product?.products?.length / 10
function App() {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(1)
  const [totalpages, setTotalPages] = useState(0) //incase pagination to be handled in backend

  const fetchProduct = async () => {
    // const data = await fetch("https://dummyjson.com/products?limit=100").then(response=>response.json()) //incase pagination to be handled in frontend
    const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`).then(response => response.json()) //incase pagination to be handled in backend
    setProduct(data)
    setTotalPages(data.total/10) //incase pagination to be handled in backend
  }

  useEffect(() => {
    fetchProduct()
  }, [page])  //incase pagination to be handled in backend
  const selectPageHandler = (selectpage) => {
    if (selectpage >= 1 && selectpage <= totalpages && selectpage !== page)
      setPage(selectpage)
  }
  // console.log([...Array(product?.products?.length/10)].map((_,i)=>i))
  return (
    <>
      <div className='container'>
        {/* {product?.products?.slice(page*10-10,page*10)?.map((item)=>(
      <ProductCatalog {...item} key={item.id}/>
    ))} */}
        {product?.products?.map((item) => (  //incase pagination to be handled in backend
          <ProductCatalog {...item} key={item.id} />
        ))}
      </div>
      {product?.products?.length > 0 && <div className='pagination'>
        <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
        {[...Array(totalpages)].map((_, i) => (
          <span key={i} onClick={() => selectPageHandler(i + 1)} className={page === i + 1 ? "pageselect" : ""}>{i + 1}</span>
        ))}
        <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
      </div>}
    </>
  )
}

export default App

