import { Resend } from 'resend'

function getEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }

  return value
}

export function getResendClient() {
  return new Resend(getEnv('RESEND_API_KEY'))
}

export function getResendConfig() {
  return {
    from: getEnv('RESEND_FROM_EMAIL'),
    to: getEnv('RESEND_TO_EMAIL'),
  }
}
