# Billing / Ordering Web App

A complete billing and ordering web application built with vanilla HTML, CSS, and JavaScript. No frameworks, no Node.js, no build tools - just pure web technologies with LocalStorage for data persistence.

## Features

### 🏠 Home Page (index.html)
- Display menu items in a responsive card grid
- Beautiful image cards with item name, price, and "Add to Cart" button
- Real-time cart badge updates
- Mobile-responsive layout (3 columns → 2 columns → 1 column)
- Visual feedback when items are added to cart

### 🛒 Shopping Cart (cart.html)
- Complete cart management with quantity controls
- Add, remove, and update item quantities
- Real-time total calculation
- Clear cart functionality
- "Pay Now" button to generate invoice
- Empty cart state with helpful message

### 📦 Manage Items (manage-items.html)
- Full CRUD operations for menu items
- Add new items with name, price, and image URL
- Edit existing items
- Delete items with confirmation
- Real-time table updates
- Form validation

### 📋 Invoice History (invoice-history.html)
- List of all previous invoices
- Sort by date (newest first)
- Click any invoice to view details
- Invoice number, date, and total displayed
- Empty state when no invoices exist

### 🧾 Invoice Details (invoice.html)
- Beautiful invoice display
- Complete item breakdown with quantities and prices
- Total amount calculation
- Download as PDF functionality
- Back navigation to invoice history
- Responsive invoice layout

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks or libraries (except jsPDF for PDF generation)
- **LocalStorage** - Client-side data persistence

## File Structure

```
billing-web-app/
│
├── index.html              # Home page with menu items
├── cart.html               # Shopping cart page
├── manage-items.html       # Menu items management (CRUD)
├── invoice-history.html    # Invoice history list
├── invoice.html            # Invoice detail view
├── styles.css              # Shared stylesheet
├── app.js                  # Core application logic
└── README.md               # This file
```

## LocalStorage Keys

The application uses the following LocalStorage keys:

- `menuItems` - Array of menu items with structure:
  ```javascript
  {
    id: string,
    name: string,
    price: number,
    image: string
  }
  ```

- `cart` - Array of cart items with structure:
  ```javascript
  {
    id: string,
    name: string,
    price: number,
    image: string,
    qty: number
  }
  ```

- `invoices` - Array of invoices with structure:
  ```javascript
  {
    id: string,
    date: string (ISO format),
    items: array,
    total: number
  }
  ```

## Default Menu Items

The app comes with 10 pre-seeded menu items:

1. Chicken Burger - $8.99
2. Cheese Burger - $9.99
3. Veg Pizza - $12.99
4. Chicken Pizza - $14.99
5. French Fries - $4.99
6. Chicken Wrap - $7.99
7. Chocolate Shake - $5.99
8. Mojito - $6.99
9. Fried Rice - $9.99
10. Chicken Noodles - $10.99

## How to Run

1. **Clone or download** this repository
2. **Open** `index.html` in a modern web browser
3. **That's it!** No installation, no build process, no dependencies to install

### Running Locally

You can use any local web server:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (http-server):
```bash
npx http-server
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

### Adding Items to Cart
1. Navigate to the home page
2. Browse the menu items
3. Click "Add to Cart" on any item
4. The cart badge will update with the item count

### Managing Cart
1. Click on the cart icon in the navigation
2. Adjust quantities using +/- buttons
3. Remove items using the "Remove" button
4. Clear the entire cart with "Clear Cart"
5. Click "Pay Now" to generate an invoice

### Managing Menu Items
1. Navigate to "Manage Items"
2. Fill in the form to add a new item
3. Click "Add Item" to save
4. Use "Edit" to modify existing items
5. Use "Delete" to remove items

### Viewing Invoices
1. Navigate to "Invoice History"
2. Click on any invoice to view details
3. Download as PDF using the "Download PDF" button

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px (mobile) and 1024px (tablet)
- Cards stack vertically on mobile
- Tables scroll horizontally on small screens
- Navigation adapts to screen size

### Dark Theme
- Modern dark color scheme
- Easy on the eyes
- High contrast for readability
- Smooth transitions and hover effects

### Data Persistence
- All data stored in browser's LocalStorage
- Persists across page refreshes
- No server required
- Data remains until browser cache is cleared

### PDF Export
- Generate PDF invoices using jsPDF
- Includes invoice number, date, items, and total
- Professional formatting
- Downloadable file

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Menu items displayed in a responsive grid layout*

### Shopping Cart
![Shopping Cart](screenshots/cart.png)
*Cart with quantity controls and total calculation*

### Manage Items
![Manage Items](screenshots/manage-items.png)
*CRUD interface for menu items*

### Invoice History
![Invoice History](screenshots/invoice-history.png)
*List of all previous invoices*

### Invoice Details
![Invoice Details](screenshots/invoice.png)
*Detailed invoice view with PDF download option*

## Future Enhancements

Potential features for future versions:

- [ ] Search functionality for menu items
- [ ] Filter by category
- [ ] User authentication
- [ ] Order status tracking
- [ ] Print invoice option
- [ ] Export invoices to CSV
- [ ] Multiple currency support
- [ ] Tax calculation
- [ ] Discount codes
- [ ] Order notes/comments

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this project and make improvements. Pull requests are welcome!

## Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

