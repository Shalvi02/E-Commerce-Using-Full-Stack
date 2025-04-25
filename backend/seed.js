const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const categories = [
  {
    name: 'Living Room',
    slug: 'living-room',
    description: 'Everything you need to create a beautiful living space',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      {
        name: 'Sofas',
        slug: 'sofas',
        description: 'Comfortable seating for your living room',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Coffee Tables',
        slug: 'coffee-tables',
        description: 'Stylish tables for your living room',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'TV Stands',
        slug: 'tv-stands',
        description: 'Modern TV stands and entertainment units',
        image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    name: 'Kitchen',
    slug: 'kitchen',
    description: 'Essential items for your kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      {
        name: 'Cookware',
        slug: 'cookware',
        description: 'High-quality pots, pans, and cooking utensils',
        image: 'https://media-uk.landmarkshops.in/cdn-cgi/image/h=550,w=550,q=85,fit=cover/homecentre/1000010527190-1000010527189_01-2100.jpg'
      },
      {
        name: 'Dinnerware',
        slug: 'dinnerware',
        description: 'Beautiful plates, bowls, and serving dishes',
        image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        description: 'Modern kitchen appliances and gadgets',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Create your perfect sleep sanctuary',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      {
        name: 'Beds & Mattresses',
        slug: 'beds-mattresses',
        description: 'Comfortable beds and quality mattresses',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bedding',
        slug: 'bedding',
        description: 'Luxurious bedding and linens',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Bedroom Furniture',
        slug: 'bedroom-furniture',
        description: 'Wardrobes, dressers, and nightstands',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

const products = [
  {
    name: "Modern L-Shaped Sofa",
    description: "Comfortable and stylish L-shaped sofa perfect for modern living rooms",
    discountPercentage: 10,
    productCode: "SOFA001",
    category: "Living Room",
    subcategory: "Sofas",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    variations: [
      {
        color: "Gray",
        size: "Large",
        stock: 5,
        price: 999.99
      },
      {
        color: "Beige",
        size: "Large",
        stock: 3,
        price: 999.99
      }
    ]
  },
  {
    name: "Glass Coffee Table",
    description: "Modern glass coffee table with metal frame",
    discountPercentage: 0,
    productCode: "TABLE001",
    category: "Living Room",
    subcategory: "Coffee Tables",
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577926606472-fd6c0e7d3300?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    variations: [
      {
        color: "Clear",
        size: "Medium",
        stock: 8,
        price: 299.99
      }
    ]
  },
  {
    name: "Smart TV Stand",
    description: "Contemporary TV stand with storage compartments",
    discountPercentage: 5,
    productCode: "TVST001",
    category: "Living Room",
    subcategory: "TV Stands",
    images: ["https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"],
    variations: [
      {
        color: "Black",
        size: "Large",
        stock: 10,
        price: 199.99
      },
      {
        color: "White",
        size: "Large",
        stock: 7,
        price: 199.99
      }
    ]
  },
  {
    name: "Non-Stick Cookware Set",
    description: "Complete set of non-stick pots and pans",
    discountPercentage: 15,
    productCode: "COOK001",
    category: "Kitchen",
    subcategory: "Cookware",
    images: [
      "https://media-uk.landmarkshops.in/cdn-cgi/image/h=550,w=550,q=85,fit=cover/homecentre/1000010527190-1000010527189_01-2100.jpg",
      "https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    variations: [
      {
        color: "Black",
        size: "12-piece",
        stock: 15,
        price: 149.99
      }
    ]
  },
  {
    name: "Ceramic Dinner Set",
    description: "Elegant ceramic dinner set for 6 people",
    discountPercentage: 0,
    productCode: "DINE001",
    category: "Kitchen",
    subcategory: "Dinnerware",
    images: [
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    variations: [
      {
        color: "White",
        size: "18-piece",
        stock: 20,
        price: 89.99
      },
      {
        color: "Blue",
        size: "18-piece",
        stock: 12,
        price: 89.99
      }
    ]
  },
  {
    name: "Smart Blender",
    description: "High-powered blender with multiple speed settings",
    discountPercentage: 20,
    productCode: "BLEN001",
    category: "Kitchen",
    subcategory: "Kitchen Appliances",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    variations: [
      {
        color: "Silver",
        size: "Standard",
        stock: 25,
        price: 79.99
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories and their subcategories
    const createdCategories = {};
    const createdSubcategories = {};

    for (const categoryData of categories) {
      const subcategories = categoryData.subcategories;
      delete categoryData.subcategories;

      // Create main category
      const category = await Category.create(categoryData);
      createdCategories[category.name] = category;
      console.log(`Created category: ${category.name}`);

      // Create subcategories
      for (const subcategoryData of subcategories) {
        const subcategory = await Category.create({
          ...subcategoryData,
          parent: category._id
        });
        createdSubcategories[subcategory.name] = subcategory;
        console.log(`Created subcategory: ${subcategory.name}`);

        // Add subcategory to parent's subcategories array
        category.subcategories.push(subcategory._id);
      }

      // Save the updated category with subcategories
      await category.save();
    }

    // Create products
    for (const productData of products) {
      const category = createdCategories[productData.category];
      const subcategory = createdSubcategories[productData.subcategory];

      if (!category || !subcategory) {
        console.error(`Category or subcategory not found for product: ${productData.name}`);
        continue;
      }

      const product = await Product.create({
        ...productData,
        category: category._id,
        subcategory: subcategory._id
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 