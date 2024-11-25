
# Bike-store

The backend of the Bike Store application is designed to manage product and order data efficiently while ensuring a secure and scalable structure.

#### The project follows the modular pattern, organizing the code into separate, reusable modules for improved maintainability and scalability. 

#### Live Link :
https://assignment-2-steel-zeta.vercel.app/api/

## Features

#### **CRUD Operations (Product):**

**1. Create:**
Admins can add new products with details such as name, description, price, category, stock, and images.

**2. Read:**
Fetch product details for display to users or admin dashboards.

**\*Filtering\*\***:
Products can be filtered by categories(name,brand,catagory).

**3.Update:**
Modify product information, such as price, stock, or description.

**4.Delete:**
Remove products from the store.

#### **Order:**

Order a product.

#### **Total Revenue:**

Able to see the total revenue according to Order.

#### **Bike Management API Endpoints**

### \*Create

**Endpoint:**
/api/products/create-a-bike

**Method:** POST

### \*Read(Category Wise)

**Endpoint:**
/api/products?searchTerm=category

### \*Read(A single product)

**Endpoint:**
/api/products/:bikeID

**Method:** GET

### \*Update

**Endpoint:**
/api/products/:bikeID

**Method:** PUT

### \*Delete

**Endpoint:**
/api/products/:bikeID

**Method:** DELETE

### \*Order

**Endpoint:**
/api/orders/:bikeID

**Method:** POST

### \*Show_Revenue

**Endpoint:**
/api/orders/revenue

**Method:** GET
README.md
Displaying README.md.
