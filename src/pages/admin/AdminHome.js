import { useState, useEffect } from '../../lib';
import axios from 'axios';

const url = 'http://localhost:3000/products';

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [title, setTitle] = useState("");

	useEffect(async() => {
		try {
			const res = await axios.get(url);
			setProducts(res.data);
		} catch(error) {
			console.log(error.message)
		}
	}, [])

	useEffect(() => {
		const menu = document.querySelector('#listMenu');
		menu.addEventListener('click', async (e) => {
			if(e.target.classList.contains('btn-delete')) {
				const { id } = e.target.dataset;
				const confirm = window.confirm("Are u sure to delete it?");

				if(!confirm) return;
				try {
					await axios.delete(`${url}/${id}`);
					setProducts(products.filter((product) => product.id !== +id))
					alert("Delete successful");
				} catch(err) {
					console.log(err.message)
				}
			}
		})
		// const input = document.querySelector('#form-input');
		// const btn = document.querySelector('#btn-search');

		const btn = document.querySelector('#button-addon2');
		const searchInput = document.querySelector('#form-search');
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const filterItems = products.filter(product => {
				if (
			          product.name
			            .toLowerCase()
			            .normalize("NFD")
			            .replace(/[\u0300-\u036f]/g, "")
			            .replace(/đ/g, "d")
			            .replace(/Đ/g, "D")
			            .indexOf(
			              	searchInput.value
			                .toLowerCase()
			                .normalize("NFD")
			                .replace(/[\u0300-\u036f]/g, "")
			                .replace(/đ/g, "d")
			                .replace(/Đ/g, "D")
			            ) > -1
			        ) return product
			})

			if(searchInput.value === '') {
				getData();
			} else {
				setProducts(filterItems);
			}

			setTitle(searchInput.value);
		})

	})

	return `
		<h1 class="text-center">ADMIN Home Page</h1>

		<div class="input-group mb-3">
		  <input type="text" class="form-control" id="form-search" value="${title}" placeholder="Recipient's username">
		  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
		</div>
		<a href="./products/add" class="btn btn-secondary">Thêm mới</a>
		<table class="table">
		    <thead>
		      <tr>
		        <th>#</th>
		        <th>Tên sản phẩm</th>
		        <th>Nhà xuất bản</th>
		        <th>Mô tả sách</th>
		        <th>Giá gốc</th>
		        <th>Đánh giá</th>
		        <th>Thao tác</th>
		      </tr>
		    </thead>
		    <tbody id="listMenu">
		      ${
		      	products.map((product, index) => {
		      		return `
		      			<tr>
		      				<td>${index + 1}</td>
		      				<td>${product.name}</td>
		      				<td>${product.resource}</td>
		      				<td>${product.description.length > 20 ? `${product.description.slice(0, 20)} ...` : product.description}</td>
		      				<td>
		      				${product.original_price}
		      				</td>
		      				<td>${product.rating}</td>
		      				<td>
		      					<button class="btn btn-danger btn-delete" data-id="${product.id}">Remove</button>
		      					<a href="./products/edit/${product.id}"><button class="btn btn-primary">Update</button></a>
		      				</td>
		      			</tr>
		      		`
		      	})
		      }
		    </tbody>
		  </table>
	`
}

export default HomePage;