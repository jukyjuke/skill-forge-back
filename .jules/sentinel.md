## 2025-02-14 - IDOR Vulnerability in User Controller
**Vulnerability:** Found Insecure Direct Object Reference (IDOR) in `deleteAccount`, `updatePassword`, `updateEmail`, and `gainXp` methods. Users could manipulate `userId` in params or body to perform actions on other users' accounts.
**Learning:** `requireAuth` middleware ensures a user is logged in but does not authorize them for the specific resource. Checking `res.locals.session.user.id` against the target `userId` is crucial.
**Prevention:** Always validate that the authenticated user (from session/token) matches the user ID being operated on for user-specific actions.
