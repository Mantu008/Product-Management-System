const express = require("express");
require("./dbConnections");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Product = require("./Models/products");
const User = require("./Models/user");
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Register a new user
app.post("/register", async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role,
    });

    let result = user.toObject();
    delete result.password;

    jwt.sign(
      { result },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Error signing token", err });
        }
        res.json({ result, auth: token });
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

//middleware for JWT

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, valid) => {
      if (err) {
        return res.status(401).send({ result: "Please provide a valid token" });
      }
      next();
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

// Login a user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const { password: _, ...userWithoutPassword } = user.toObject();

    jwt.sign(
      { data: userWithoutPassword },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Error signing token", err });
        }
        res.json({ userWithoutPassword, auth: token });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a product
app.post("/", verifyToken, async (req, res) => {
  const { name, productCode, hsn, salesPrice, purchasePrice } = req.body;
  const product = new Product({
    name,
    productCode,
    hsn,
    salesPrice,
    purchasePrice,
  });
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all products
app.get("/allproduct", verifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a product by ID
app.get("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
app.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
app.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is now running on http://localhost:${PORT} Port`)
);
