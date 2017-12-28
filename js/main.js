// No semicolons used here =)

let auth2, googleUser

let appStart = function() {
  gapi.load('auth2', initSignInV2)
}


let initSignInV2 = function() {
  auth2 = gapi.auth2.init({
    client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
    scope: 'profile'
  })

  // Listen for sign in changes
  auth2.isSignedIn.listen(signinChanged)

  // Listen for user changes
  auth2.currentUser.listen(userChanged)

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn()
  }

  refreshValues()

} // End of initSignInV2

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function(val) {
  console.log('Signin state changed to ', val)
  // document.getElementById('signed-in-cell').innerText = val
  if (auth2.isSignedIn.get()) {
    buttonControl(false)
    document.getElementById('button-sign-out').addEventListener('click', function() {
      auth2.signOut()
    })

  } else {
    buttonControl(true)
  }

}

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function(user) {
  console.log('User now: ', user)
  googleUser = user

  updateGoogleUser()
  // document.getElementById('curr-user-cell').innerText = JSON.stringify(user, undefined, 2)
}


var buttonControl = function(command) {
  if (command) {
    document.getElementById('sign-in-button-text').innerText = 'Sign in with Google'
    document.getElementById('g-sign-in-wrapper').addEventListener('click', signIn, true)
    document.getElementById('button-sign-out').style.display = 'none'

  } else {
    document.getElementById('sign-in-button-text').innerText = 'Signed in with Google'
    console.log("Removing Event Listener")
    document.getElementById('g-sign-in-wrapper').removeEventListener('click', signIn, true)
    document.getElementById('button-sign-out').style.display = ''
  }
}

// Wrapping Google's signIn inside a function expression so we can add/remove it when needed.
var signIn = function() {
  auth2.signIn()
}

// Updates the properties in the Google User table using the current user.

var updateGoogleUser = function() {
  // Check if the user is signed in
  if (auth2.isSignedIn.get()) {

    var profile = googleUser.getBasicProfile()
    console.log(profile)

    // Create a container with user info
    var container = document.createElement('div')
    container.id = 'user-details-wrapper'
    var mainHeading = document.createElement('h1')
    mainHeading.className = 'main-heading'
    mainHeading.textContent = 'User details'
    var heading = document.createElement('h2')
    console.log(profile)
    heading.textContent = profile.getName()
    var avatar = document.createElement('img')
    avatar.className = 'avatar'
    avatar.src = profile.getImageUrl()
    var email = document.createElement('a')
    email.className = 'email'
    email.textContent = profile.getEmail()
    email.href = 'mailto:' + profile.getEmail()
    email.target = '_blank'

    // Append the container and children to the DOM
    document.body.appendChild(container)
    container.appendChild(mainHeading)
    container.appendChild(heading)
    container.appendChild(avatar)
    container.appendChild(email)

  } else {
    // Get the user details container 
    var userDetailsContainer = document.getElementById('user-details-wrapper')
    // Remove it
    userDetailsContainer.parentNode.removeChild(userDetailsContainer)
  }
}

// Retrieves the current user and signed in states from the GoogleAuth object.
var refreshValues = function() {


  if (auth2.isSignedIn.get()) {
    buttonControl(false)
  } else {
    buttonControl(true)
  }

}

// Begin app
appStart()