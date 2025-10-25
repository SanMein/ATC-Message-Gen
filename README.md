# ATC Message Generator

A lightweight, browser-based Air Traffic Control (ATC) message generator and simulator. Build realistic ATC and pilot voice/text communications using a simple form — with text-to-speech, clipboard copy, and a persistent recent history.

Project homepage: ATC-Message-Gen  
License: MIT

---

## Features

- Generate pilot or ATC messages from structured form inputs
- Wide range of message/response types (initial contact, takeoff/landing requests, emergency messages, traffic reports, etc.)
- Text-to-speech (Web Speech API) to listen to generated messages
- Copy generated messages to clipboard
- Save recent messages to local history (stored in localStorage)
- Clean, responsive UI with light/dark-friendly design
- Small, dependency-free client-side app (vanilla JS, HTML, CSS)

---

## Demo

Open `index.html` in any modern browser. For best results (and to avoid local file restrictions), serve the directory with a simple HTTP server:

- Python 3:
  ```
  python -m http.server 8000
  ```
  Then open http://localhost:8000

- Node (http-server):
  ```
  npx http-server -p 8000
  ```

---

## Quick Usage

1. Open the app in your browser.
2. Choose a speaker role (Pilot or ATC).
3. Select a message type from the dropdown.
4. Fill fields such as Tail Number, Runway, Location, Altitude, ATIS, Frequency, and Notes.
5. Click "Generate Message".
6. Use the action buttons to Copy, Speak, or Save to history.
7. View recent messages in the "Recent Messages" panel — they persist between sessions.

---

## Message Types

The app supports many message categories, for example:

- Pilot messages: Initial Contact, Request to Enter Airspace, Takeoff Request, Landing Request, Position Report, VFR Transition, Altitude Change Request, Leaving Airspace, Frequency Change, Uncontrolled Airport Report, Emergency Declaration, Maneuver Request, Traffic Report.
- ATC responses: Initial Contact Response, Request to Enter Airspace Response, Takeoff Request Response, Landing Request Response, Emergency Declaration Response, Maneuver Request Response, Traffic Report Response.

(See `index.html` for the complete list and labels.)

---

## Files & Structure

- index.html — Main UI
- css/styles.css — Styling and responsive layout
- js/message-generator.js — Message templating and generation logic
- js/history-manager.js — Local history handling and rendering
- js/script.js — App controller, event wiring, UI logic
- assets/logo.png — Project icon/logo
- LICENSE — MIT license

---

## Development

To make changes locally:

1. Clone the repo
   ```
   git clone https://github.com/SanMein/ATC-Message-Gen.git
   cd ATC-Message-Gen
   ```
2. Serve the directory (see Demo above) or open `index.html` directly.
3. Edit JS/CSS/HTML files with your preferred editor.
4. Refresh the browser to see changes.

Notes:
- The UI uses plain JavaScript — no build step required.
- The app uses the browser's Web Speech API for text-to-speech. Behavior may vary across browsers and platforms.

---

## Customization

- Add or adapt message templates in `js/message-generator.js`.
- Change history size in `js/history-manager.js` (`maxItems`).
- Modify UI colors and layout in `css/styles.css`.

---

## Troubleshooting

- If text-to-speech does not work, confirm your browser supports the Web Speech API (Chrome, Edge, Firefox have varying support).
- If clipboard copy fails, ensure the page is served over HTTPS or `http://localhost`.
- If saved messages don't appear, check browser localStorage settings and console for errors.

---

## Contributing

Contributions, ideas, and fixes are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Make changes and test in-browser
4. Open a pull request describing the change

Please keep changes small and focused; include a short description of behavior changes and any backwards-incompatible adjustments.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgements

- Built with vanilla JS, CSS, and HTML for simplicity and portability.
- Uses Font Awesome for icons (CDN included in `index.html`).

---

## Contact

Created by SanMein (repo owner). For questions or improvements, open an issue or a pull request on the repository.
