import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmails";
import { client, sender } from "./mailTrap";


export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
    const recipient = [{ email }];
    
    try {
        // Replace placeholder in HTML template with actual verification token
        const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);
        
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email - Food App',
            html: emailHtml,
            category: 'Email Verification'
        });
        
        console.log(`✅ Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error("❌ Failed to send verification email:", error);
        throw new Error("Failed to send email verification");
    }
}
export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Welcome to PatelEats',
            html:htmlContent,
            template_variables:{
                company_info_name:"PatelEats",
                name:name
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    }
}
export const sendPasswordResetEmail = async (email:string, resetURL:string) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html:htmlContent,
            category:"Reset Password"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    }
}
export const sendResetSuccessEmail = async (email:string) => {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successfully',
            html:htmlContent,
            category:"Password Reset"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
}