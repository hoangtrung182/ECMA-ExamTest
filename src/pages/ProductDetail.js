import { useEffect, useState } from '../lib';
import axios from 'axios';

const url = 'http://localhost:3000/products';

const ProductDetail = ({ id }) => {
	const [currentItem, setCurrentItem] = useState({});

	useEffect(async () => {
		try {
			const res = await axiso.get(`${url}/${id}`);
			setCurrentItem(res.data)
		} catch(err) {
			console.log(err)
		}
	}, [])
	return `ProductDetail`
}

export default ProductDetail;