import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "your-secret-key-here")

# Sample product data for the catalog
PRODUCTS = [
    {
        "firm": "TechMart",
        "icon": "fas fa-laptop",
        "name": "MacBook Pro 16-inch",
        "category": "Laptops",
        "description": ["M2 Max chip with 12-core CPU", "32GB unified memory", "1TB SSD storage", "16-inch Liquid Retina XDR display"]
    },
    {
        "firm": "GadgetZone",
        "icon": "fas fa-mobile-alt",
        "name": "iPhone 15 Pro",
        "category": "Smartphones",
        "description": ["A17 Pro chip", "128GB storage", "Pro camera system", "Titanium design"]
    },
    {
        "firm": "ElectroHub",
        "icon": "fas fa-headphones",
        "name": "Sony WH-1000XM5",
        "category": "Audio",
        "description": ["Industry-leading noise canceling", "30-hour battery life", "Premium comfort", "Crystal clear hands-free calling"]
    },
    {
        "firm": "TechMart",
        "icon": "fas fa-tablet-alt",
        "name": "iPad Pro 12.9-inch",
        "category": "Tablets",
        "description": ["M2 chip performance", "12.9-inch Liquid Retina XDR display", "Apple Pencil support", "All-day battery life"]
    },
    {
        "firm": "GamerWorld",
        "icon": "fas fa-gamepad",
        "name": "PlayStation 5",
        "category": "Gaming",
        "description": ["Ultra-high speed SSD", "Ray tracing support", "4K gaming capability", "DualSense wireless controller"]
    },
    {
        "firm": "SmartHome",
        "icon": "fas fa-tv",
        "name": "Samsung 65-inch QLED TV",
        "category": "Electronics",
        "description": ["4K Ultra HD resolution", "Quantum Dot technology", "Smart TV features", "HDR10+ support"]
    },
    {
        "firm": "FitnessGear",
        "icon": "fas fa-heartbeat",
        "name": "Apple Watch Series 9",
        "category": "Wearables",
        "description": ["Advanced health monitoring", "GPS tracking", "Water resistant", "All-day battery life"]
    },
    {
        "firm": "CameraCorner",
        "icon": "fas fa-camera",
        "name": "Canon EOS R5",
        "category": "Photography",
        "description": ["45MP full-frame sensor", "8K video recording", "In-body image stabilization", "Dual memory card slots"]
    },
    {
        "firm": "AudioMax",
        "icon": "fas fa-volume-up",
        "name": "Bose SoundLink Revolve+",
        "category": "Audio",
        "description": ["360-degree sound", "16-hour battery life", "Water resistant design", "Built-in speakerphone"]
    },
    {
        "firm": "TechMart",
        "icon": "fas fa-keyboard",
        "name": "Logitech MX Master 3S",
        "category": "Accessories",
        "description": ["Precision scrolling", "Multi-device connectivity", "Ergonomic design", "70-day battery life"]
    },
    {
        "firm": "HomeAutomation",
        "icon": "fas fa-home",
        "name": "Amazon Echo Dot (5th Gen)",
        "category": "Smart Home",
        "description": ["Improved audio quality", "Built-in temperature sensor", "Voice control", "Smart home hub capabilities"]
    },
    {
        "firm": "WorkStation",
        "icon": "fas fa-desktop",
        "name": "Dell XPS 8950",
        "category": "Desktops",
        "description": ["Intel Core i7 processor", "16GB DDR5 RAM", "512GB SSD storage", "NVIDIA GeForce RTX graphics"]
    },
    {
        "firm": "MobileGear",
        "icon": "fas fa-charging-station",
        "name": "MagSafe Charger",
        "category": "Accessories",
        "description": ["Wireless charging", "MagSafe compatible", "Fast charging support", "Compact design"]
    },
    {
        "firm": "CloudStorage",
        "icon": "fas fa-hdd",
        "name": "Western Digital My Passport",
        "category": "Storage",
        "description": ["2TB portable storage", "USB 3.2 Gen 1 interface", "Password protection", "Compact and durable"]
    },
    {
        "firm": "NetworkPro",
        "icon": "fas fa-wifi",
        "name": "ASUS AX6000 Router",
        "category": "Networking",
        "description": ["Wi-Fi 6 technology", "Mesh network support", "Advanced security features", "Gaming optimization"]
    },
    {
        "firm": "PrinterPlus",
        "icon": "fas fa-print",
        "name": "HP OfficeJet Pro 9015e",
        "category": "Printers",
        "description": ["All-in-one printer", "Wireless connectivity", "Automatic duplex printing", "Mobile printing support"]
    }
]

@app.route('/')
def index():
    """Display the product catalog"""
    return render_template('index.html', products=PRODUCTS)

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Handle customer registration"""
    if request.method == 'POST':
        # Get form data
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        address = request.form.get('address')
        city = request.form.get('city')
        state = request.form.get('state')
        zip_code = request.form.get('zip_code')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        # Basic validation
        if not all([first_name, last_name, email, phone, password, confirm_password]):
            flash('All fields are required!', 'error')
            return render_template('register.html')
        
        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return render_template('register.html')
        
        if len(password) < 8:
            flash('Password must be at least 8 characters long!', 'error')
            return render_template('register.html')
        
        # In a real application, you would save the user data to a database
        flash(f'Registration successful! Welcome, {first_name} {last_name}!', 'success')
        return redirect(url_for('index'))
    
    return render_template('register.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
