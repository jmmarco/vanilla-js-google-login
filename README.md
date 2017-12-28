# A simple Sign In portal using the Google Sign-In JavaScript API

# Quickstart

- Clone the repository
- [Create a Project and Client ID using Google's Developer Console](https://developers.google.com/identity/sign-in/web/devconsole-project)
- Replace the `client_id` value on line `12` of the file `main.js` with your project's Client ID.
- Assuming you set your project's Authorized JavaScript origin and Authorized redirect URI to `http://localhost:8080`, then use a webserver like [Python's Simple HTTP Server](https://docs.python.org/2/library/simplehttpserver.html) to run your app. Like this: `python -m SimpleHTTPServer 8080
`
- Point your Browser to `http://localhost:8080` and now you can sign in using your Google Credentials