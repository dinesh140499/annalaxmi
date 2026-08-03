const Products = require("../../models/productSchema");

class DeleteProductRepository {
    async deleteOne(productDoc) {
        return await productDoc.deleteOne();
    }

    async findByIdAndDelete(id) {
        return await Products.findByIdAndDelete(id);
    }
}

module.exports = new DeleteProductRepository();
