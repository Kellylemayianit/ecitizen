# Mandhari update: web styling and Vercel

Copy these into your project root, overwriting app/_layout.tsx:
  app/_layout.tsx   (centers the app on desktop web)
  app/+html.tsx     (web font, page background, base CSS)
  vercel.json       (build settings for Vercel)

Then in app.json, inside the "expo" object, make sure the web section reads:
  "web": { "bundler": "metro", "output": "single" }
(keep your existing "favicon" line if present)

Test the production build locally:
  npx expo export -p web
  npx serve dist
