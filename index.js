// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ecormmerce',
  });
  

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Endpoint to create a product
app.post('/create-product', (req, res) => {
  const { name, imageUrl, old_price, new_price, category, feature, rating, countInStock } = req.body;

  const sql = 'INSERT INTO products (name, imageUrl, old_price, new_price, category, feature, rating, countInStock) VALUES (?, ?, ?, ?, ?, ?,?, ?)';
  db.query(sql, [name, imageUrl, old_price, new_price, category,feature, rating, countInStock], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Error creating product' });
    } else {
      res.status(201).json({ message: 'Product created successfully' });
    }
  });
});
app.post('/create-category', (req, res) => {
    const { categoryname } = req.body;
    const sql = 'INSERT INTO categories (categoryname) VALUES (?)';
    db.query(sql, [categoryname], (err, result) => {
      if (err) {
        console.error('Error creating Category:', err);
        res.status(500).json({ error: 'Error creating Category' });
      } else {
        res.status(201).json({ message: 'Category created successfully' });
      }
    });
  });
  
// Endpoint to fetch all products
app.get('/all-products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/all-categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Error fetching categories' });
      } else {
        res.status(200).json(result);
      }
    });
  });
// Endpoint to fetch an individual product by ID
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'SELECT * FROM products WHERE productId = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error fetching product by ID:', err);
      res.status(500).json({ error: 'Error fetching product by ID' });
    } else {
      if (result.length > 0) {
        // Product found
        res.status(200).json(result[0]);
      } else {
        // Product not found
        res.status(404).json({ error: 'Product not found' });
      }
    }
  });
});
app.get('/category/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'SELECT * FROM categories WHERE categoryId = ?';
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        console.error('Error fetching category by ID:', err);
        res.status(500).json({ error: 'Error fetching category by ID' });
      } else {
        if (result.length > 0) {
          // Product found
          res.status(200).json(result[0]);
        } else {
          // Product not found
          res.status(404).json({ error: 'Category not found' });
        }
      }
    });
  });

// Endpoint to delete a product by ID
app.delete('/confirm-delete-product/:id', (req, res) => {
    const productId = req.params.id;
  
    const sql = 'DELETE FROM products WHERE productId = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Error deleting product' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    });
  });
  app.delete('/confirm-delete-category/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'DELETE FROM categories WHERE categoryId = ?';
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        console.error('Error deleting Category:', err);
        res.status(500).json({ error: 'Error deleting Category' });
      } else {
        res.status(200).json({ message: 'Category deleted successfully' });
      }
    });
  });
  app.delete('/delete-order/:id', (req, res) => {
    const orderId = req.params.id;
  
    const sql = 'DELETE FROM orders WHERE orderId = ?';
    db.query(sql, [orderId], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Error deleting order' });
      } else {
        res.status(200).json({ message: 'Order deleted successfully' });
      }
    });
  });

  // Endpoint to update a product by ID
app.put('/update-product/:id', (req, res) => {
    const productId = req.params.id;
    const { name, imageUrl, old_price, new_price, category, feature, rating } = req.body;
  
    const sql = 'UPDATE products SET name = ?, imageUrl = ?, old_price = ?, new_price = ?, category = ?, feature = ?, rating = ? WHERE productId = ?';
    db.query(sql, [name, imageUrl, old_price, new_price, category, feature, rating, productId], (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Error updating product' });
      } else {
        res.status(200).json({ message: 'Product updated successfully' });
      }
    });
  });

  app.put('/update-category/:id', (req, res) => {
    const categoryId = req.params.id;
    const { categoryName } = req.body;
  
    const sql = 'UPDATE categories SET categoryname = ? WHERE categoryId = ?';
    db.query(sql, [categoryName, categoryId], (err, result) => {
      if (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Error updating category' });
      } else {
        res.status(200).json({ message: 'Category updated successfully' });
      }
    });
  });
  // Assuming you have an 'express' app and a 'db' connection

app.get('/all-features', (req, res) => {
    const sql = 'SELECT * FROM features';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching all features:', err);
        res.status(500).json({ error: 'Error fetching all features' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching all users:', err);
        res.status(500).json({ error: 'Error fetching all users' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  app.get('/feature/:id', (req, res) => {
    const featureId = req.params.id;
  
    const sql = 'SELECT * FROM features WHERE featureId = ?';
    db.query(sql, [featureId], (err, result) => {
      if (err) {
        console.error('Error fetching feature by ID:', err);
        res.status(500).json({ error: 'Error fetching feature by ID' });
      } else {
        if (result.length > 0) {
          // Feature found
          res.status(200).json(result[0]);
        } else {
          // Feature not found
          res.status(404).json({ error: 'Feature not found' });
        }
      }
    });
  });
  app.put('/update-feature/:id', (req, res) => {
    const featureId = req.params.id;
    const { featureName } = req.body;
  
    const sql = 'UPDATE features SET featureName = ? WHERE featureId = ?';
    db.query(sql, [featureName, featureId], (err, result) => {
      if (err) {
        console.error('Error updating feature:', err);
        res.status(500).json({ error: 'Error updating feature' });
      } else {
        res.status(200).json({ message: 'Feature updated successfully' });
      }
    });
  });
  app.delete('/confirm-delete-feature/:id', (req, res) => {
    const featureId = req.params.id;
  
    const sql = 'DELETE FROM features WHERE featureId = ?';
    db.query(sql, [featureId], (err, result) => {
      if (err) {
        console.error('Error deleting feature:', err);
        res.status(500).json({ error: 'Error deleting feature' });
      } else {
        res.status(200).json({ message: 'Feature deleted successfully' });
      }
    });
  });
  app.post('/create-feature', (req, res) => {
    const { featureName } = req.body;
    const sql = 'INSERT INTO features (featureName) VALUES (?)';
  
    db.query(sql, [featureName], (err, result) => {
      if (err) {
        console.error('Error creating feature:', err);
        res.status(500).json({ error: 'Error creating feature' });
      } else {
        res.status(201).json({ message: 'Feature created successfully' });
      }
    });
  });
    
  app.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching all orders:', err);
        res.status(500).json({ error: 'Error fetching all orders' });
      } else {
        res.status(200).json(result);
      }
    });
  });

 app.get('/orders/:id', (req, res) => {
  const orderId = req.params?.id;
  const sql = 'SELECT * FROM orders WHERE orderId = ?';

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('Error fetching order:', err);
      res.status(500).json({ error: 'Error fetching order' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.get('/products', (req, res) => {
  const productIds = req.query.ids.split(',').map(Number);
  const sql = 'SELECT * FROM products WHERE productId IN (?)';

  db.query(sql, [productIds], (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params?.id;
  const sql = 'SELECT * FROM users WHERE userId = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});
app.put('/update-order/:id', (req, res) => {
  const orderId = req.params.id;

  const sql = 'UPDATE orders SET delivered = true WHERE orderId = ?';
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Error updating order' });
    } else {
      res.status(200).json({ message: 'order updated successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
