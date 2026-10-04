export default function handler(req, res) {
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;
  res.status(200).json({
    status: 'ok',
    configured: hasUser && hasPass,
    smtpUser: process.env.SMTP_USER || 'Not set',
    receiverEmail: process.env.RECEIVER_EMAIL || 'sumanjana9692@gmail.com',
  });
}
