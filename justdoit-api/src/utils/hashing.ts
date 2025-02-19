const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// Utility function to convert base64 to ArrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

// Generate a random salt
const generateSalt = (): ArrayBuffer => {
  return crypto.getRandomValues(new Uint8Array(16)).buffer
}

// Hash password with salt
export const hashPassword = async (password: string): Promise<string> => {
  const salt = generateSalt()
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password)
  
  // Combine salt and password
  const combinedData = new Uint8Array(salt.byteLength + passwordData.byteLength)
  combinedData.set(new Uint8Array(salt), 0)
  combinedData.set(new Uint8Array(passwordData.buffer), salt.byteLength)
  
  // Hash the combined data
  const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData)
  
  // Combine salt and hash for storage
  const combinedBuffer = new Uint8Array(salt.byteLength + hashBuffer.byteLength)
  combinedBuffer.set(new Uint8Array(salt), 0)
  combinedBuffer.set(new Uint8Array(hashBuffer), salt.byteLength)
  
  return arrayBufferToBase64(combinedBuffer.buffer)
}

// Verify password
export const verifyPassword = async (password: string, storedHash: string): Promise<boolean> => {
  try {
    const storedData = base64ToArrayBuffer(storedHash)
    const salt = storedData.slice(0, 16)
    const storedHashPart = storedData.slice(16)
    
    const encoder = new TextEncoder()
    const passwordData = encoder.encode(password)
    
    // Combine salt and password
    const combinedData = new Uint8Array(salt.byteLength + passwordData.byteLength)
    combinedData.set(new Uint8Array(salt), 0)
    combinedData.set(new Uint8Array(passwordData.buffer), salt.byteLength)
    
    // Hash the combined data
    const hashBuffer = await crypto.subtle.digest('SHA-256', combinedData)
    
    // Compare the hashes
    const storedHashArray = new Uint8Array(storedHashPart)
    const newHashArray = new Uint8Array(hashBuffer)
    
    if (storedHashArray.length !== newHashArray.length) return false
    
    return storedHashArray.every((val, i) => val === newHashArray[i])
  } catch (error) {
    return false
  }
}
