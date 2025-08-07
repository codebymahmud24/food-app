export const generateVerificationCode = (length = 6): string => {
    // Character set includes uppercase, lowercase letters and numbers
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = ''; // Store the generated verification code
    const charactersLength = characters.length;
  
    // Generate random characters for the specified length
    for (let i = 0; i < length; i++) {
        // Get random index and append corresponding character
        verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return verificationCode;
}; 