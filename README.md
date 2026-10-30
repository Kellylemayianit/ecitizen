Update 5 (apply after update 4): loaders and a theme switch that is always reachable on web.
- Splash loader instead of a blank screen: a CSS spinner while the web bundle loads (app/+html.tsx) and a branded loader while the app restores your session
- Inline loader while a lookup runs
- Dark/Light switch: bottom of the desktop sidebar, in the web footer on narrow screens, and still under Profile, Appearance (System, Light, Dark)
Copy app/ and src/ over your project, then run: npx expo start -c
