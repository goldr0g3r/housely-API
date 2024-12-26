import * as bcrypt from 'bcrypt';
export interface IHashPassword {
  hash: string;
  salt: string;
}
export async function hashPassword(password: string): Promise<IHashPassword> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hashSync(password, salt);
  return { hash, salt };
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compareSync(password, hash);
}
