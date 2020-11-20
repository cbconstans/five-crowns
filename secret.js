// * Create a file called `secrets.js` in the project root
//   * This file is listed in `.gitignore`, and will _only_ be required
//     in your _development_ environment
//   * Its purpose is to attach the secret environment variables that you
//     will use while developing
//   * However, it's **very** important that you **not** push it to
//     Github! Otherwise, _prying eyes_ will find your secret API keys!
//   * It might look like this:

;```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```
