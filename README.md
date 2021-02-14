# WRI File Storage

## What it does?
- User can create an account and sign in with Firebase Authentication
- User can reset their password
- User can update their email and password

## Notes
- (https://temp-mail.org/en/) for Temporary Email Address.  It provides temporary, secure, anonymous, free, disposable email address.
- hooks folder for logic code
- Doing query in firebase requires an index
- bootstrap "text-truncate" will truncate the text if it too long
- `useLocation` to get the state from react-router

## Firebase Rules
- For firebase security on firebase console

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
    	function authed() {
      	// return true if the user is log in
      	return request.auth != null
      }
      
      function matchesUser(data) {
      	// return true is the data belong to the user
      	return request.auth.uid == data.userId
      }
      
      allow read: if authed() && matchesUser(resource.data)
      allow create: if authed() && matchesUser(request.resource.data)
    }
  }
}
```