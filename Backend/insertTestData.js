const axios = require('axios');

const API_URL = 'http://localhost:4000/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzhkMjNmMzdiYjkxMjA3YzFiN2Q3YSIsImlhdCI6MTc3Mjg1NjQ0NSwiZXhwIjoxNzcyOTQyODQ1fQ.jQ-FvXWQZXmOP0d2zE0fT176V3nHdiwijqHbLwLCWr8';

const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
};

const getOrCreate = async (endpoint, data, uniqueKey = 'title') => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data, { headers });
        console.log(`✅ Created ${endpoint}: ${response.data[uniqueKey] || response.data.title}`);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message?.includes('duplicate key error') || error.response?.status === 400 || error.response?.status === 500) {
            // Try to find it in the list
            try {
                const list = await axios.get(`${API_URL}/${endpoint}`, { headers });
                const existing = list.data.find(item => item[uniqueKey] === data[uniqueKey]);
                if (existing) {
                    console.log(`ℹ️ Using existing ${endpoint}: ${existing[uniqueKey]}`);
                    return existing;
                }
            } catch (listError) {
                console.error(`❌ Error fetching ${endpoint} list:`, listError.message);
            }
        }
        console.error(`❌ Error with ${endpoint}:`, error.response?.data || error.message);
        throw error;
    }
};

const insertData = async () => {
    try {
        console.log("--- Inserting Test Data ---");

        // 1. Brand
        const brand = await getOrCreate('brand', { title: 'Test Brand' });

        // 2. Category
        const category = await getOrCreate('category', { title: 'Test Category' });

        // 3. Color
        const color = await getOrCreate('color', { title: '#FF0000' });

        // 4. Blog Category
        const blogCategory = await getOrCreate('blogcategory', { title: 'Test Blog Category' });

        // 5. Blog
        try {
            const blog = await axios.post(`${API_URL}/blog`, {
                title: 'Test Blog Post',
                description: 'This is a test blog post description.',
                category: 'Test Blog Category'
            }, { headers });
            console.log(`✅ Created blog: ${blog.data.title}`);
        } catch (e) {
            console.log("ℹ️ Blog might already exist or failed.");
        }

        // 6. Product
        try {
            const product = await axios.post(`${API_URL}/product`, {
                title: 'Test Product',
                slug: 'test-product-' + Date.now(), // Unique slug
                description: 'This is a test product description.',
                price: 100,
                category: 'Test Category',
                brand: 'Test Brand',
                color: [color._id],
                quantity: 10
            }, { headers });
            console.log(`✅ Created product: ${product.data.title}`);
        } catch (e) {
             console.error(`❌ Error with product:`, e.response?.data || e.message);
        }

        console.log("--- Data insertion process completed ---");

    } catch (error) {
        console.error("❌ Critical error:", error.message);
    }
};

insertData();
