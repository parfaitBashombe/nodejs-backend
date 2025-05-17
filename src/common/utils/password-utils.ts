import { pbkdf2Sync, randomBytes } from "crypto";

export default class Password {
  private static ITERATIONS = 100000;
  private static KEYLENGTH = 64;
  private static DIGEST = "sha512";
  private static ENCODING: BufferEncoding = "hex";
  private static SALT_LENGTH = 32;

  static salt(): string {
    return randomBytes(this.SALT_LENGTH).toString(this.ENCODING);
  }

  static hash(password: string, salt: string): string {
    return pbkdf2Sync(
      password,
      salt,
      this.ITERATIONS,
      this.KEYLENGTH,
      this.DIGEST
    ).toString(this.ENCODING);
  }

  static compare(
    password: string,
    hashedPassword: string,
    salt: string
  ): boolean {
    const hash = this.hash(password, salt);
    return hash === hashedPassword;
  }
}
