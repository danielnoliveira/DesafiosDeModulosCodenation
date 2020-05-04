const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
function getProductsByIDs(ids,productsList){
	return productsList.filter(product=>ids.includes(product.id));
}
function getPromotion(products){
	var looks = {};
	for(product of products){
		if(looks[product.category]){
			looks[product.category] += 1;
			continue;
		}
		looks[product.category] = 1;
	}
	var looks_quantity = Object.values(looks).length;
	return promotions[looks_quantity-1];
}
function getDiscontPrice(promotions,promotion){
	for(p of promotions){
		if(p.looks.includes(promotion)){
			return p.price;
		}
	}
	return 0;
}
function getTotalPriceAndDiscontPrice(products,promotion){
	var soma = products.reduce((acc,prox)=>{
		var discont_price = getDiscontPrice(prox.promotions,promotion);
		return [acc[0]+prox.regularPrice,acc[1]+(discont_price||prox.regularPrice)];
	},[0,0]) 
	return soma;
}
function getShoppingCart(ids, productsList) {
	
	const products = getProductsByIDs(ids,productsList);
	const promotion = getPromotion(products);
	const [total_price,price_no_discont] = getTotalPriceAndDiscontPrice(products,promotion);//sem desconto
	return {
		products:[...products.map(p=>{
			return {
				name:p.name,
				category:p.category
			};
		})],
		promotion,
		totalPrice:`${price_no_discont.toFixed(2)}`,
		discountValue:`${(total_price-price_no_discont).toFixed(2)}`,
		discount:`${(((total_price-price_no_discont)/total_price)*100).toFixed(2)}%`
	};
}

module.exports = { getShoppingCart, getProductsByIDs,getPromotion,getTotalPriceAndDiscontPrice,getDiscontPrice};
