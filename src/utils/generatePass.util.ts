export function generatePassword(size: number): string {
  const specialChars: string = "!@#$%^&*()_-+=[]{}|;:,.<>?";
  const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
  const numbers: string = "0123456789";

  const allChars: string =
    specialChars + uppercaseChars + lowercaseChars + numbers;

  let password: string = "";

  // Ensure at least one of each character type
  password += randomChar(specialChars);
  password += randomChar(uppercaseChars);
  password += randomChar(lowercaseChars);
  password += randomChar(numbers);

  // Generate the rest of the password
  for (let i = 4; i < size; i++) {
    password += randomChar(allChars);
  }

  // Shuffle the password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

function randomChar(characters: string): string {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}
