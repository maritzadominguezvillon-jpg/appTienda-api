import bcrypt from 'bcryptjs';

const clave = '123456';

const hash = await bcrypt.hash(clave, 10);

console.log(hash);