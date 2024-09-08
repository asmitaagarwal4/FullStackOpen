```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: runs the javascript code fetched when opening the spa to create rerender the new note  

    browser->>server: POST 
    https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 note created
    deactivate server

```