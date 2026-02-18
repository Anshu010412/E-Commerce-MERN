% E-Commerce MERN — API Documentation

Base URL (development): http://localhost:5000

Authentication
- **Method:** Bearer Token
- **Header:** Authorization: Bearer <token>

Overview
- **API prefixes:**
  - **/api/auth** — user authentication and profile ([Backend/routes/authRoutes.js](Backend/routes/authRoutes.js))
  - **/api/products** — product CRUD and listing ([Backend/routes/productRoutes.js](Backend/routes/productRoutes.js))
  - **/api/cart** — user cart operations ([Backend/routes/cartRoutes.js](Backend/routes/cartRoutes.js))
  - **/api/address** — user addresses ([Backend/routes/addressRoutes.js](Backend/routes/addressRoutes.js))
  - **/api/order** — placing and viewing orders ([Backend/routes/orderRoutes.js](Backend/routes/orderRoutes.js))

Folder mapping (backend)
- **Routes:** [Backend/routes](Backend/routes) — route definitions
- **Controllers:** [Backend/controller](Backend/controller) — request handlers
- **Models:** [Backend/model](Backend/model) — Mongoose schemas


Endpoints (summary)

**Auth** (/api/auth)

<div style="background: rgba(0,0,0,0.03); padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.06); margin-bottom:12px;">
- **POST** <code>/api/auth/register</code> — Register a new user  
  - Body: { "name": "", "email": "", "password": "" }  
  - Response: user object + token

- **POST** <code>/api/auth/login</code> — Login and receive token  
  - Body: { "email": "", "password": "" }  
  - Response: { token, user }

- **GET** <code>/api/auth/profile</code> — Get current user profile (auth required)
</div>

**Products** (/api/products)

<div style="background: rgba(0,0,0,0.03); padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.06); margin-bottom:12px;">
- **GET** <code>/api/products</code> — List products (query params for search/pagination)  
  - Response: [ { product } ]

- **GET** <code>/api/products/:id</code> — Get product by id

- **POST** <code>/api/products</code> — Create product (admin)  
  - Body: product fields (title, price, description, images, etc.)

- **PUT** <code>/api/products/:id</code> — Update product (admin)

- **DELETE** <code>/api/products/:id</code> — Delete product (admin)
</div>

**Cart** (/api/cart)

<div style="background: rgba(0,0,0,0.03); padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.06); margin-bottom:12px;">
- **GET** <code>/api/cart</code> — Get current user's cart (auth required)

- **POST** <code>/api/cart</code> — Add item to cart  
  - Body: { "productId": "", "quantity": number }

- **PUT** <code>/api/cart/:itemId</code> — Update cart item quantity

- **DELETE** <code>/api/cart/:itemId</code> — Remove item from cart
</div>

**Address** (/api/address)

<div style="background: rgba(0,0,0,0.03); padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.06); margin-bottom:12px;">
- **GET** <code>/api/address</code> — List user's saved addresses (auth required)

- **POST** <code>/api/address</code> — Add new address  
  - Body: { "street": "", "city": "", "state": "", "zip": "", "country": "" }

- **PUT** <code>/api/address/:id</code> — Update address

- **DELETE** <code>/api/address/:id</code> — Remove address
</div>

**Order** (/api/order)

<div style="background: rgba(0,0,0,0.03); padding:12px; border-radius:8px; border:1px solid rgba(0,0,0,0.06); margin-bottom:12px;">
- **POST** <code>/api/order</code> — Place an order (auth required)  
  - Body: { "cartId": "", "addressId": "", "paymentMethod": "" }  
  - Response: order confirmation

- **GET** <code>/api/order</code> — Get user's orders (auth required)

- **GET** <code>/api/order/:id</code> — Get order details
</div>

Error handling
- Responses typically include HTTP status codes and a JSON body like:
  - { "message": "Error description" }

Examples (curl)
- Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

- List products:

```bash
curl http://localhost:5000/api/products
```

Notes & next steps
- Review route-specific request/response shapes inside the controller files in [Backend/controller](Backend/controller).
- If you want, I can expand each endpoint with full request/response examples taken directly from the controller implementations.

--
Generated for the E-Commerce MERN project. Server entry: [Backend/server.js](Backend/server.js)
