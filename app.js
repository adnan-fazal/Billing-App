// ============================================================================
// Billing Web App - Core Logic
// ============================================================================

// LocalStorage Keys
const STORAGE_KEYS = {
    MENU_ITEMS: 'menuItems',
    CART: 'cart',
    INVOICES: 'invoices'
};

// ============================================================================
// LocalStorage Helpers
// ============================================================================

function getMenuItems() {
    const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    if (!items) {
        seedDefaultMenu();
        return getMenuItems();
    }
    return JSON.parse(items);
}

function setMenuItems(items) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
}

function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function getInvoices() {
    const invoices = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return invoices ? JSON.parse(invoices) : [];
}

function addInvoice(invoice) {
    const invoices = getInvoices();
    invoices.push(invoice);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}

function generateInvoiceId() {
    return Date.now().toString();
}

// ============================================================================
// Default Menu Seeding
// ============================================================================

function seedDefaultMenu() {
    const defaultItems = [
        {
            id: '1',
            name: 'Chicken Burger',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop'
        },
        {
            id: '2',
            name: 'Cheese Burger',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'
        },
        {
            id: '3',
            name: 'Veg Pizza',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
            id: '4',
            name: 'Chicken Pizza',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop'
        },
        {
            id: '5',
            name: 'French Fries',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop'
        },
        {
            id: '6',
            name: 'Chicken Wrap',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop'
        },
        {
            id: '7',
            name: 'Chocolate Shake',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
        },
        {
            id: '8',
            name: 'Mojito',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop'
        },
        {
            id: '9',
            name: 'Fried Rice',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop'
        },
        {
            id: '10',
            name: 'Chicken Noodles',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'
        }
    ];
    setMenuItems(defaultItems);
}

// ============================================================================
// Cart Functions
// ============================================================================

function addToCart(itemId) {
    const menuItems = getMenuItems();
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const cart = getCart();
    const existingItem = cart.find(c => c.id === itemId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1
        });
    }

    setCart(cart);
    updateCartBadge();
    return cart;
}

function updateCartQuantity(itemId, qty) {
    if (qty < 1) {
        removeFromCart(itemId);
        return;
    }

    const cart = getCart();
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.qty = qty;
        setCart(cart);
        updateCartBadge();
    }
    return cart;
}

function removeFromCart(itemId) {
    const cart = getCart();
    const filteredCart = cart.filter(c => c.id !== itemId);
    setCart(filteredCart);
    updateCartBadge();
    return filteredCart;
}

function clearCart() {
    setCart([]);
    updateCartBadge();
}

function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.qty, 0);
}

// ============================================================================
// Menu Item CRUD
// ============================================================================

function createMenuItem(name, price, image) {
    const items = getMenuItems();
    const newItem = {
        id: generateInvoiceId(),
        name: name.trim(),
        price: parseFloat(price),
        image: image.trim()
    };
    items.push(newItem);
    setMenuItems(items);
    return newItem;
}

function updateMenuItem(id, name, price, image) {
    const items = getMenuItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = {
            id: id,
            name: name.trim(),
            price: parseFloat(price),
            image: image.trim()
        };
        setMenuItems(items);
        return items[index];
    }
    return null;
}

function deleteMenuItem(id) {
    const items = getMenuItems();
    const filteredItems = items.filter(i => i.id !== id);
    setMenuItems(filteredItems);
    return filteredItems;
}

// ============================================================================
// Invoice Functions
// ============================================================================

function createInvoice(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const invoice = {
        id: generateInvoiceId(),
        date: new Date().toISOString(),
        items: cartItems.map(item => ({ ...item })),
        total: total
    };
    addInvoice(invoice);
    return invoice;
}

function getInvoiceById(id) {
    const invoices = getInvoices();
    return invoices.find(inv => inv.id === id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================================================
// PDF Generation
// ============================================================================

function generatePDF(invoice) {
    // Check if jsPDF is loaded (UMD bundle exposes it as window.jspdf.jsPDF)
    const jsPDFLib = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDFLib) {
        alert('PDF library not loaded. Please refresh the page.');
        return;
    }

    const doc = new jsPDFLib();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Invoice Number
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #: ${invoice.id}`, margin, yPosition);
    yPosition += 8;

    // Date
    doc.text(`Date: ${formatDate(invoice.date)}`, margin, yPosition);
    yPosition += 15;

    // Items Table Header
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('Item', margin, yPosition);
    doc.text('Qty', margin + 60, yPosition);
    doc.text('Price', margin + 90, yPosition);
    doc.text('Subtotal', margin + 130, yPosition);
    yPosition += 8;

    // Draw line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Items
    doc.setFont(undefined, 'normal');
    invoice.items.forEach(item => {
        if (yPosition > 250) {
            doc.addPage();
            yPosition = margin;
        }
        doc.text(item.name, margin, yPosition);
        doc.text(item.qty.toString(), margin + 60, yPosition);
        doc.text('$' + item.price.toFixed(2), margin + 90, yPosition);
        doc.text('$' + (item.price * item.qty).toFixed(2), margin + 130, yPosition);
        yPosition += 8;
    });

    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Total
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text(`Total: $${invoice.total.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 20;

    // Footer
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('Generated by Billing Web App', pageWidth / 2, yPosition, { align: 'center' });

    // Save PDF
    doc.save(`invoice-${invoice.id}.pdf`);
}

// ============================================================================
// Navigation
// ============================================================================

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = getCartItemCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function initializeNavigation() {
    updateCartBadge();
}

// ============================================================================
// Initialize on DOM Load
// ============================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

