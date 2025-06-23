const verifyEmailTemplate = ({ name, url }) => {
    return `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
  <p>Dear <strong>${name}</strong>,</p>
  <p>Thank you for registering with <strong>Medication Management System</strong>.</p>
  <p>Please verify your email address to complete your registration and activate your account:</p>
  <a href="${url}" style="display: inline-block; margin-top: 16px; padding: 12px 28px; background: #019950; color: #fff; font-weight: bold; border-radius: 6px; text-decoration: none; font-size: 16px;">Verify Email</a>
  <p style="margin-top: 24px;">If you did not create an account, please ignore this email.</p>
  <p>Best regards,<br/><strong>Medication Management System Team</strong></p>
</div>
    `
}

export default verifyEmailTemplate