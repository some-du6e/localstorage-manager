#!/bin/bash

# Ask the user if they want to start an HTTP server
read -p "do you want a http server to easily copy the bookmarklet?: " answer

if [[ "$answer" =~ ^[Yy]$ ]]; then
    echo "Generating bookmarklet..."
    # Capture the bookmarklet output
    BOOKMARKLET=$(bookmarklet -d ./bookmarklet.js)
    
    # Write the bookmarklet output to index.html
    echo "$BOOKMARKLET" > index.html
    
    # Open the URL in an already opened browser window
    echo "Opening bookmarklet in browser..."
    xdg-open http://localhost:8000/index.html &
    
    # Start a simple HTTP server
    python3 -m http.server
else
    echo "ok then"
fi