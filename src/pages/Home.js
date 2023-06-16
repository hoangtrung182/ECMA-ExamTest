import { useEffect, useState } from '../lib';
import axios from 'axios';
const url = 'http://localhost:3000/products';


const Home = () => {
	const [products, setProducts] = useState([]);
	useEffect(async() => {
		try {
			const res = await axios.get(url);
			setProducts(res.data);
		} catch(err) {
			console.log(err)
		}
	}, [])
	return `
		<div class="container">
			<nav class="navbar navbar-expand-lg bg-body-tertiary">
			  <div class="container-fluid">
			    <a class="navbar-brand" href="#">Home</a>
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse" id="navbarSupportedContent">
			      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
			        <li class="nav-item">
			          <a class="nav-link active" aria-current="page" href="./about">About</a>
			        </li>
			        <li class="nav-item">
			          <a class="nav-link" href="#">Cart</a>
			        </li>
			      </ul>
			      <form class="d-flex" role="search">
			        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
			        <button class="btn btn-outline-success" type="submit">Search</button>
			      </form>
			    </div>
			  </div>
			</nav>
			<article>
		      <div class="row gap-2 my-3">
		       	${
				   	products.map((product, index) => {
				   		return `
				   			<div class="card col" style="width: 14rem;">
						      <img src="${product.image}" class="card-img-top" alt="...">
						      <div class="card-body">
						        <h5 class="card-title">${product.name}</h5>
						        <p class="card-text">${product.original_price}</p>
						        <p class="card-text">Rate: ${product.rating}</p>
						        <a href="./products/${product.id}" class="btn btn-primary">Go detail</a>
						      </div>
						    </div>
				   		`
				   	}).join('')
				   }
		      </div>
		    </article> 
		</div>

	`
}

export default Home;