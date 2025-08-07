// HTML template for verification email
export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .verification-code { background: #667eea; color: white; padding: 15px 30px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 5px; margin: 20px 0; letter-spacing: 3px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ Food App</h1>
        <p>Verify Your Email Address</p>
    </div>
    <div class="content">
        <h2>Welcome to Food App!</h2>
        <p>Thank you for signing up! Please verify your email address by using the verification code below:</p>
        <div class="verification-code">{verificationToken}</div>
        <p>This code will expire in 24 hours for security reasons.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
    </div>
    <div class="footer">
        <p>&copy; 2024 Food App. All rights reserved.</p>
    </div>
</body>
</html>
`;

// Generate HTML content for welcome email
export const generateWelcomeEmailHtml = (name: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Food App</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            .welcome-message { background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🎉 Welcome to Food App!</h1>
        </div>
        <div class="content">
            <div class="welcome-message">
                <h2>Hello ${name}!</h2>
                <p>Your email has been successfully verified. Welcome to our food community!</p>
            </div>
            <p>You can now:</p>
            <ul>
                <li>Browse delicious food options</li>
                <li>Place orders from your favorite restaurants</li>
                <li>Track your order status</li>
                <li>Save your favorite meals</li>
            </ul>
            <p>Thank you for joining us. We're excited to serve you!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Food App. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
};

// Generate HTML content for password reset email
export const generatePasswordResetEmailHtml = (resetURL: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            .reset-button { display: inline-block; background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .reset-button:hover { background: #ee5a24; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🔐 Password Reset</h1>
        </div>
        <div class="content">
            <h2>Reset Your Password</h2>
            <p>You requested to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center;">
                <a href="${resetURL}" class="reset-button">Reset Password</a>
            </div>
            <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                    <li>This link will expire in 1 hour</li>
                    <li>If you didn't request this reset, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                </ul>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetURL}</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Food App. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
};

// Generate HTML content for successful password reset email
export const generateResetSuccessEmailHtml = (): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            .success-message { background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .security-tips { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>✅ Password Reset Successful</h1>
        </div>
        <div class="content">
            <div class="success-message">
                <h2>🎉 Success!</h2>
                <p>Your password has been successfully reset.</p>
            </div>
            <p>You can now log in to your account using your new password.</p>
            <div class="security-tips">
                <h3>🔒 Security Tips:</h3>
                <ul>
                    <li>Use a strong, unique password</li>
                    <li>Don't share your password with anyone</li>
                    <li>Consider enabling two-factor authentication</li>
                    <li>Log out from shared devices</li>
                </ul>
            </div>
            <p>If you didn't make this change, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Food App. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
};