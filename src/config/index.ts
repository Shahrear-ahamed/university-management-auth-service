import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  env: process.env.NODE_DEV,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNT,

  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_SECRET_EXPIRES_ID,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_ID,
  },
};
