# Roblox Badge Purger

This script enumerates **all badges** on a Roblox user account and **deletes them one by one** via official Roblox endpoints. It obtains a CSRF token, paginates through all badges, and submits authenticated DELETE requests.

> **⚠️ Irreversible action:** Deleting badges cannot be undone. Use only on accounts you own and understand the consequences.

---

## ⚡ How to Use

1. **Log in** to your Roblox account in your browser:  
   https://www.roblox.com/

2. **Open the Developer Console** on any Roblox page:  
   - Chrome / Edge: `F12` → **Console**  
   - Firefox: `Ctrl+Shift+K`  
   - Safari: `Cmd+Opt+C`

3. **Prepare the script**:
   - Open `robloxBadgePurger.js` from this repo.
   - Set your numeric `userId` at the top of the file:
     ```js
     let userId = "123456789"; // <-- your Roblox user ID (string or number)
     ```
   - (Optional but recommended) enable the **confirmation prompt** variant (see Safety Tips) before running.

4. **Run**: Copy all of `robloxBadgePurger.js`, paste it into the console, and press **Enter**.

5. **Monitor progress** in the console output:
   - Shows pagination while fetching badges
   - Logs each deletion as it happens
   - Prints a final completion message
