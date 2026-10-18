Cumulative update 3: supersedes updates 1 and 2. Light/dark mode + desktop sidebar layout + live KRA lookups.
Copy app/ and src/ over your project (overwrite), then restart: npx expo start -c
Desktop sidebar needs a browser window 1024px wide or more, and only shows after you sign in and unlock with your PIN.
Set EXPO_PUBLIC_API_URL (for example http://localhost:8080) to call the Rust backend; without it the Tax tiles show demo data.
