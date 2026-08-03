class UpdateProductRepository {
    async save(productDoc) {
        return await productDoc.save();
    }
}

module.exports = new UpdateProductRepository();
