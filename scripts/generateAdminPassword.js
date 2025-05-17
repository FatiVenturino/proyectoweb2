const bcrypt = require('bcryptjs');

async function generateHash() {
    const passwordAdmin = 'admin';
    const passwordCliente = 'cliente';
    
    const saltAdmin = await bcrypt.genSalt(10);
    const saltCliente = await bcrypt.genSalt(10);
    
    const hashAdmin = await bcrypt.hash(passwordAdmin, saltAdmin);
    const hashCliente = await bcrypt.hash(passwordCliente, saltCliente);
    
    console.log('Hash para admin:', hashAdmin);
    console.log('Hash para cliente:', hashCliente);
}

generateHash(); 