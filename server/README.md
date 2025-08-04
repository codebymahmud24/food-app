# Food App Server

A comprehensive food delivery application backend built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization** (JWT-based)
- **Restaurant Management** (CRUD operations)
- **Food Item Management** (Menu management)
- **Order Management** (Complete order lifecycle)
- **Role-based Access Control** (Customer, Restaurant Owner, Admin)
- **Search & Filtering** (Advanced search capabilities)
- **File Upload Support** (Images for restaurants and food items)
- **Real-time Order Status Updates**

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Image Storage**: Cloudinary
- **Email Service**: Mailtrap
- **Development**: Nodemon, ts-node

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── utils/          # Utility functions
├── index.ts           # Main server file
├── tsconfig.json      # TypeScript configuration
├── .env              # Environment variables
└── package.json      # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/foodapp

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailtrap Configuration
MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
```

### 3. Database Setup
Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your MongoDB instance.

### 4. Seed Sample Data (Optional)
```bash
npm run seed
```

This will create sample users, restaurants, and food items for testing.

### 5. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication
Include JWT token in requests:
- **Cookie**: `token=your_jwt_token`
- **Header**: `Authorization: Bearer your_jwt_token`

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

#### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create restaurant (Owner/Admin)
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

#### Food Items
- `GET /api/food-items` - Get all food items
- `GET /api/food-items/:id` - Get food item by ID
- `POST /api/food-items` - Create food item (Owner/Admin)
- `PUT /api/food-items/:id` - Update food item
- `DELETE /api/food-items/:id` - Delete food item

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🎭 User Roles

### Customer
- Browse restaurants and food items
- Place and track orders
- Review completed orders
- Manage profile

### Restaurant Owner
- Manage restaurant information
- Add/edit/delete food items
- View and manage restaurant orders
- Update order status

### Admin
- Full access to all endpoints
- Manage users, restaurants, and orders
- System administration

## 🧪 Sample Data

After running `npm run seed`, you'll have:

**Users:**
- Customer: `customer@example.com` (password: `password123`)
- Restaurant Owner: `mario@pizza.com` (password: `password123`)
- Admin: `admin@foodapp.com` (password: `password123`)

**Restaurants:**
- Mario's Pizza Palace (Italian cuisine)
- Burger Junction (American cuisine)

**Food Items:**
- Various pizzas, burgers, salads, and sides

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- CORS configuration
- Rate limiting ready
- Secure cookie settings

## 🌐 CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (React development server)
- `http://localhost:3002` (Alternative frontend port)

Update `CLIENT_URL` in `.env` to match your frontend URL.

## 📝 Development Notes

### Adding New Features
1. Create model in `src/models/`
2. Create controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Add routes to `src/routes/index.ts`

### Database Relationships
- Users can be customers, restaurant owners, or admins
- Restaurants belong to restaurant owners
- Food items belong to restaurants
- Orders connect customers, restaurants, and food items

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`

2. **JWT Token Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration

3. **CORS Errors**
   - Update `CLIENT_URL` in `.env`
   - Check frontend URL matches

4. **TypeScript Errors**
   - Run `npm run build` to check compilation
   - Ensure all types are properly defined

## 📞 Support

For issues and questions:
1. Check the API documentation
2. Review error logs in console
3. Verify environment variables
4. Test with sample data using seeder

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - User authentication
  - Restaurant management
  - Food item management
  - Order management
  - Role-based access control