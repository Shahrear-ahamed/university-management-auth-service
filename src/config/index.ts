import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  env: process.env.NODE_DEV,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNT,
};
