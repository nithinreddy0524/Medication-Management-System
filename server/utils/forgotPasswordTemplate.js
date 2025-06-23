const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
  <p>Dear <strong>${name}</strong>,</p>

  <p>You have requested a password reset for your account. Please use the following OTP code to securely reset your password:</p>

  <div style="background-color: #019950; font-size: 24px; padding: 15px; text-align: center; font-weight: bold; border-radius: 6px; margin: 20px 0; color: #fff; letter-spacing: 2px;">
    ${otp}
  </div>

  <p>This OTP is valid for <strong>1 hour</strong>. Please enter it in the <strong>Medication Management System</strong> to proceed with resetting your password.</p>

  <p>If you did not request this, please ignore this email or contact support if you have concerns.</p>

  <p>Best regards,</p>
  <p><strong>Medication Management System Team</strong></p>
</div>
    `
}

export default forgotPasswordTemplate