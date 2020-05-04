const { products } = require('../src/data/products');
const { getProductsByIDs,getPromotion,getTotalPriceAndDiscontPrice,getDiscontPrice } = require('../src');

const produtosMock1 = [products[11],products[6],products[20],products[15]];
const produtosMock2 = [products[11],products[12],products[20],products[15]];
const produtosMock3 = [products[11],products[12],products[10],products[15]];
const produtosMock4 = [products[9],products[10],products[12],products[11]];
describe('small Functions',()=>{
    it('retorn um array com os produtos de acordo com a lista de IDs',()=>{
        const ids = [110,120,130,140,150];
        const response = getProductsByIDs(ids,products);
        expect(response.length).toBe(5);
        expect(response[0].name).toBe("PINK PANTHER™ T-SHIRT");
        expect(response[4].name).toBe("POCKET T-SHIRT");
    });
    it('retorn a promoção FULL LOOK',()=>{
        const response = getPromotion(produtosMock1);

        expect(response).toBe('FULL LOOK');
    });
    it('retorn a promoção TRIPLE LOOK',()=>{
        const response = getPromotion(produtosMock2);

        expect(response).toBe('TRIPLE LOOK');
    });
    it('retorn a promoção DOUBLE LOOK',()=>{
        const response = getPromotion(produtosMock3);

        expect(response).toBe('DOUBLE LOOK');
    });
    it('retorn a promoção SINGLE_LOOK',()=>{
        const response = getPromotion(produtosMock4);

        expect(response).toBe('SINGLE LOOK');
    });
    it('retorna o preço total do carrinho e o preço total com desconto',()=>{
        const [total,total_discont] = getTotalPriceAndDiscontPrice(produtosMock1,"SINGLE LOOK");
        expect(total).toBe(729.96);
        expect(total_discont).toBe(689.96);
    });
    it('retorna o valor com desconto se o produto tiver a categoria Look escolhida',()=>{
        const item = products[0];
        const response = getDiscontPrice(item.promotions,"DOUBLE LOOK");
        expect(response).toBe(124.99);
    });
    it('retorn o valor 0 se o produto não tiver um desconto pro look escolhido',()=>{
        const item = products[3];
        const response = getDiscontPrice(item.promotions,"DOUBLE LOOK");
        expect(response).toBe(0);
    });
});