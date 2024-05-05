import crypto from 'crypto';

// Function to generate a hash
function generateHash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

// Function to validate a hash

function validateHash(userPassword: string, hash: string, salt: string): boolean {
  const expectedHash = crypto.createHash('sha256').update(userPassword + salt).digest('hex');
  return expectedHash === hash;
}

export default {validateHash, generateHash}