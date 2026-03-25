export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process form data here
    // Verify token (reCAPTCHA/Turnstile)
    res.status(200).json({ status: 'success', message: 'Mensaje recibido' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
