# Integration Audio using the Web API for Speech, MIDI and Audio

The overall goal was to improve the user experience, accessibility and interaction using audio features and to have more fun by combining music input with visual feedback.

## Integrated features

The following features are integrated and listed according to the order in the Hackathon presentation:
* **MIDI**: Idea of a "Music Captcha" in the login form, where you need to solve the captcha by playing the correct note on a MIDI enabled device (synthesizer). The source code also includes the check for the velocity but this was not presented.
* **TextToSpeech**: Hear a personalized welcome message after the login on the My Account overview page. It dynamically uses the first and the last name of the logged in user. 
* **TextToSpeech**: Hear the "Daily Report" using a specific speaker icon which includes information about the current budget and the number of open requisitions.
* **MIDI** and **TextToSpeech**: Navigate through the My Account subnavigation menu items using the MIDI enabled device (synthesizer). A specific note highlights a specific menu item (as if it would be hovered with a mouse) and the highlighted menu item is spoken. The menu item will be opened when pressing the corresponding note for a longer time period (> 2sec).
* **SpeechRecognition**: Use the microphone icon at the bottom right side. The trigger word "Search for" is used to execute a search with the words which are spoken directly after "Search for". For example "Search for headsets" searches for "headsets". 
* **MIDI**: Playing music using the MIDI enabled device (synthesizer) highlights the My Account sub menu items in the correct rhythm. Several notes can be played at the same time.
* **MIDI**: Logout the user by playing a specific note and holding it (on the My Account page where the "Logout" link is shown at the last subnavigation menu item). 
