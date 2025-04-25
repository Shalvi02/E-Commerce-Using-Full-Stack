const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { auth, adminAuth } = require('../middleware/auth');

// Get all categories with their subcategories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
            .populate({
                path: 'parent',
                select: 'name'
            })
            .populate({
                path: 'subcategories',
                select: 'name description image'
            });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get category by ID with subcategories
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate({
                path: 'parent',
                select: 'name'
            })
            .populate({
                path: 'subcategories',
                select: 'name description image'
            });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get subcategories of a category
router.get('/:id/subcategories', async (req, res) => {
    try {
        const subcategories = await Category.find({ parent: req.params.id })
            .select('name description image');
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create category (admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const { name, description, parent, image } = req.body;
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        // Check if category with same name exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }

        const category = new Category({
            name,
            slug,
            description,
            parent,
            image
        });

        await category.save();

        // If this is a subcategory, update the parent category
        if (parent) {
            await Category.findByIdAndUpdate(parent, {
                $push: { subcategories: category._id }
            });
        }

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update category (admin only)
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const { name, description, parent, image } = req.body;
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // If parent is changing, update both old and new parent
        if (category.parent && category.parent.toString() !== parent) {
            await Category.findByIdAndUpdate(category.parent, {
                $pull: { subcategories: category._id }
            });
        }

        if (parent && (!category.parent || category.parent.toString() !== parent)) {
            await Category.findByIdAndUpdate(parent, {
                $push: { subcategories: category._id }
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, slug, description, parent, image },
            { new: true }
        ).populate('parent subcategories');

        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete category (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Remove from parent's subcategories
        if (category.parent) {
            await Category.findByIdAndUpdate(category.parent, {
                $pull: { subcategories: category._id }
            });
        }

        // Delete all subcategories
        await Category.deleteMany({ parent: category._id });

        await category.remove();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 