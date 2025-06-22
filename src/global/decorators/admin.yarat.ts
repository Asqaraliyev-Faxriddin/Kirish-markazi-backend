import * as bcrypt from 'bcrypt';
import { User } from 'src/common/models/user.model';

export async function createSuperAdmin() {
  const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'SUPERADMIN' // yoki 'admin' sizning rol enum bo‘yicha
    });

    console.log('✅ Superadmin yaratildi: admin@gmail.com / admin123');
  } else {
    console.log('ℹ️ Superadmin allaqachon mavjud');
  }
}
