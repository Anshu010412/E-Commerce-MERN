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
- POST /api/auth/register — Register a new user
  - Body: { "name": "", "email": "", "password": "" }
  - Response: user object + token
- POST /api/auth/login — Login and receive token
  - Body: { "email": "", "password": "" }
  - Response: { token, user }
- GET /api/auth/profile — Get current user profile (auth required)

**Products** (/api/products)
- GET /api/products — List products (query params for search/pagination)
  - Response: [ { product } ]
- GET /api/products/:id — Get product by id
- POST /api/products — Create product (admin)
  - Body: product fields (title, price, description, images, etc.)
- PUT /api/products/:id — Update product (admin)
- DELETE /api/products/:id — Delete product (admin)

**Cart** (/api/cart)
- GET /api/cart — Get current user's cart (auth required)
- POST /api/cart — Add item to cart
  - Body: { "productId": "", "quantity": number }
- PUT /api/cart/:itemId — Update cart item quantity
- DELETE /api/cart/:itemId — Remove item from cart

**Address** (/api/address)
- GET /api/address — List user's saved addresses (auth required)
- POST /api/address — Add new address
  - Body: { "street": "", "city": "", "state": "", "zip": "", "country": "" }
- PUT /api/address/:id — Update address
- DELETE /api/address/:id — Remove address

**Order** (/api/order)
- POST /api/order — Place an order (auth required)
  - Body: { "cartId": "", "addressId": "", "paymentMethod": "" }
  - Response: order confirmation
- GET /api/order — Get user's orders (auth required)
- GET /api/order/:id — Get order details

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
