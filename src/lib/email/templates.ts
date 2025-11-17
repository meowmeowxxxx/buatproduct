/**
 * Email template for product approval
 */
export function getProductApprovedEmail(
  userName: string,
  productName: string,
  productUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Product Approved!</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Great news! Your product <strong>${productName}</strong> has been approved and is now live on our platform.</p>
            <p>Your product is now visible to all users and can start receiving upvotes and views.</p>
            <a href="${productUrl}" class="button">View Your Product</a>
            <p style="margin-top: 30px;">Thank you for contributing to our community!</p>
          </div>
          <div class="footer">
            <p>ProductLaunch Platform | Making great products discoverable</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Email template for product rejection
 */
export function getProductRejectedEmail(
  userName: string,
  productName: string,
  rejectionReason: string,
  productEditUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ef4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .reason-box { background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Product Requires Changes</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for submitting <strong>${productName}</strong>. Unfortunately, it requires some changes before it can be published.</p>
            <div class="reason-box">
              <p><strong>Reason:</strong></p>
              <p>${rejectionReason}</p>
            </div>
            <p>Please review the feedback and make the necessary changes. You can then resubmit your product for approval.</p>
            <a href="${productEditUrl}" class="button">Edit Your Product</a>
          </div>
          <div class="footer">
            <p>ProductLaunch Platform | Making great products discoverable</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Email template for payment success
 */
export function getPaymentSuccessEmail(
  userName: string,
  productName: string,
  amount: string,
  productUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8b5cf6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .amount { font-size: 32px; font-weight: bold; color: #8b5cf6; margin: 20px 0; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Payment Successful!</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Your payment has been processed successfully!</p>
            <div class="amount">${amount}</div>
            <p><strong>${productName}</strong> is now featured on our platform and will appear at the top of product listings.</p>
            <p>Your featured status will help you get more visibility and upvotes from the community.</p>
            <a href="${productUrl}" class="button">View Your Featured Product</a>
            <p style="margin-top: 30px;">Thank you for your support!</p>
          </div>
          <div class="footer">
            <p>ProductLaunch Platform | Making great products discoverable</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Email template for product upvote notification
 */
export function getUpvoteNotificationEmail(
  userName: string,
  productName: string,
  upvoteCount: number,
  productUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .count { font-size: 48px; font-weight: bold; color: #f59e0b; margin: 20px 0; text-align: center; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👍 Your Product Got Upvoted!</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Someone just upvoted your product <strong>${productName}</strong>!</p>
            <div class="count">${upvoteCount}</div>
            <p style="text-align: center;">Total Upvotes</p>
            <p>Keep up the great work! The more upvotes you get, the higher your product will rank.</p>
            <a href="${productUrl}" class="button">View Your Product</a>
          </div>
          <div class="footer">
            <p>ProductLaunch Platform | Making great products discoverable</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Email template for welcome email
 */
export function getWelcomeEmail(userName: string, dashboardUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ProductLaunch! 🚀</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            <p>Welcome to ProductLaunch Platform! We're excited to have you join our community of entrepreneurs and product creators.</p>
            <p>Here's what you can do:</p>
            <ul>
              <li>Submit your SaaS, Micro SaaS, or digital products</li>
              <li>Get discovered by potential customers</li>
              <li>Receive upvotes and feedback from the community</li>
              <li>Feature your products for maximum visibility</li>
            </ul>
            <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
            <p style="margin-top: 30px;">If you have any questions, feel free to reach out!</p>
          </div>
          <div class="footer">
            <p>ProductLaunch Platform | Making great products discoverable</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
