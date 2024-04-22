const mongoose = require('mongoose');

class DatabaseCrud {
    constructor() {
        this.model = model;
    }

    // Fetch all products with off-set pagination
    async getDocuments(page, limit) {
        try {
            const data = await this.model.find().skip((page - 1) * limit).limit(limit);
            return data;
        } catch (error) {
            throw new Error('Failed to retrive data from the database');
        }
    }

    // count the document.
    async countDocument() {
        try {
            const res = await this.model.countDocuments();
            return res;

        } catch (error) {
            throw new Error('Failed to count the document')
        }
    }

    // Get the single document
    async getDocument(id) {
        try {
            const data = await this.model.findOne({ _id: id });
            return data;
        } catch (error) {
            throw new Error("Failed tp get the document")
        }
    }

    // Create the single document
    async createDocument(data) {
        try {
            const savedDocument = await this.model.create(data);
            return savedDocument;
        } catch (error) {
            throw new Error("Failed to create the document")
        }
    }

    // Update the single document
    async updateDocument(id, updateData) {
        try {
            const result = await this.model.findOneAndUpdate(
                { _id: id },
                updateData
            );
            return result;
        } catch (error) {
            throw new Error("Failed to update the data");
        }
    }

    // Delete the Single document.
    async deleteDocument(id) {
        try {
            const productExist = await this.model.findById({ _id: id });
            if (productExist) {
                const data = await this.model.deleteOne({ _id: id });

                if (data.acknowledged) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw new Error("Failed to get the data from the database");
        }

    }

}

export default DatabaseCrud