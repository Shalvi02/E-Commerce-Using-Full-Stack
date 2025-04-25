const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, subCategory, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (subCategory) {
            query.subCategory = subCategory;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { productCode: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query)
            .populate({
                path: 'category',
                select: 'name'
            })
            .populate({
                path: 'subCategory',
                select: 'name'
            })
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: 'category',
                select: 'name'
            })
            .populate({
                path: 'subCategory',
                select: 'name'
            });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create product (admin only)
router.post('/', adminAuth, upload.array('images', 5), async (req, res) => {
    try {
        const { name, productCode, description, category, subCategory, variations } = req.body;
        
        // Validate required fields
        if (!name || !productCode || !description || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if product code already exists
        const existingProduct = await Product.findOne({ productCode });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product code already exists' });
        }

        const images = req.files.map(file => file.path);
        const parsedVariations = JSON.parse(variations);

        // Validate variations
        if (!Array.isArray(parsedVariations) || parsedVariations.length === 0) {
            return res.status(400).json({ message: 'At least one variation is required' });
        }

        const product = new Product({
            name,
            productCode,
            description,
            images,
            category,
            subCategory,
            variations: parsedVariations
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update product (admin only)
router.put('/:id', adminAuth, upload.array('images', 5), async (req, res) => {
    try {
        const { name, productCode, description, category, subCategory, variations } = req.body;
        
        // Validate required fields
        if (!name || !productCode || !description || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if product code already exists (excluding current product)
        const existingProduct = await Product.findOne({
            productCode,
            _id: { $ne: req.params.id }
        });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product code already exists' });
        }

        const updateData = {
            name,
            productCode,
            description,
            category,
            subCategory,
            variations: JSON.parse(variations)
        };

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.path);
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('category subCategory');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete product (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 