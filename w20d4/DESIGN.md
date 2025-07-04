The Test Plan

The LiveSearch app includes these critical user interactions:

1. should type in the search field
2. should search for an album
3. should filter results based on some parameters

Typing

- Visits the root of the app
- Finds the search input field and type 'Bruno Mars'
- Makes correction using backspace

Filtering

- Visits the root of the app
- Finds the first checkbox and uncheck it by clicking on the label

Searching

- Visits the root of the app
- Finds the search input field and type 'Celine Dion'
- Waits for the API mock results to load
- Checks for a explicit album
- Uncheck Explicit filter
- Confirms that the explicit album is filtered out
