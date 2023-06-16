import { useEffect, router, useState } from '../../lib';
import axios from 'axios';
import Joi from 'joi';

const url = 'http://localhost:3000/products';

const updateSchema = Joi.object({
	id: Joi.number(),
	name: Joi.string().trim(),
	resource: Joi.string().trim(),
	description: Joi.string().trim(),
	original_price: Joi.number().integer().min(0),
	rating: Joi.number().integer().required(),
	image: Joi.string()
})
const UpdateProduct = ({ id }) => {
	const [currentProduct, setCurrentProduct] = useState({});

	useEffect(async () => {
		try {
			const res = await axios.get(`${url}/${id}`);
			console.log(res.data)
			setCurrentProduct(res.data)
		} catch(err) {
			console.log(err.message)
		}
	}, [])

	useEffect(() => {
		const form = document.querySelector('#form-add');
		const ProductName = document.querySelector('#product-name');
		const ProductResource = document.querySelector('#product-resource');
		const ProductDesc = document.querySelector('#product-desc');
		const ProductPrice = document.querySelector('#product-price');
		const ProductRating = document.querySelector('#product-rating');
		const ProductImage = document.querySelector('#product-image');

		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const newProduct = {
				id,
				name: ProductName.value,
				resource: ProductResource.value,
				description: ProductDesc.value,
				original_price: ProductPrice.value,
				rating: ProductRating.value,
				image: ProductImage.value
			}

			const { error, value } = updateSchema.validate(newProduct);
			if(!error) {
				try {
					await axios.put(`${url}/${id}`, newProduct);
					alert('Updated successful');
					router.navigate('/admin/products');
				} catch(err) {
					console.log(err.message)
				}
			} else {
				alert(error.message)
			}


		})
	})
	return `
		<h1>Update</h1>
		<form id="form-add">
		  <div class="mb-3">
		    <label class="form-label">Name</label>
		    <input type="text" class="form-control" id="product-name" value="${currentProduct.name}">
		  </div>

		  <div class="mb-3">
		    <label class="form-label">Resource</label>
		    <input type="text" class="form-control" id="product-resource" value="${currentProduct.resource}">
		  </div>

		  <div class="mb-3">
			  <label class="form-label">Description</label>
			  <div class="form-floating mb-3">
				  <textarea class="form-control" placeholder="Leave a comment here" id="product-desc" style="height: 100px">${currentProduct.description}</textarea>
				</div>
			</div>

		  <div class="mb-3">
		    <label class="form-label">Price</label>
		    <input type="number" class="form-control" id="product-price" value="${currentProduct.original_price}">
		  </div>

		  <div class="mb-3">
		    <label class="form-label">Image</label>
		    <input type="text" class="form-control" id="product-image">
		  </div>

		  <div class="mb-3">
		    <label class="form-label">Rating</label>
		  <div class="mb-3">
			   <select class="form-select" id="product-rating" required>
			      <option selected disabled value="${currentProduct.rating}">${currentProduct.rating}</option>
			      <option>1</option>
			      <option>2</option>
			      <option>3</option>
			      <option>4</option>
			      <option>5</option>
			    </select>
		   </div>
		  <button type="submit" class="btn btn-primary">Update</button>
		</form>
	`
}

export default UpdateProduct;