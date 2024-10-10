const bcrypt = require('bcrypt');

async function hashPasswords() {
    const passwords = ['Marleypassword1', 'Maxpassword1', 'Eugpassword1', 'Bobpassword1'];

    for (const password of passwords) {
        const saltRounds = 10; // Number of rounds to generate salt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Original password: ${password} | Hashed password: ${hashedPassword}`);
    }
}

hashPasswords();