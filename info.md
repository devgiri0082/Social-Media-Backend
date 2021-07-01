# User Model:

- userName (string) (unique)
- Email (string) (password)
- password (string) (bycrypted)
- followers (objectId)
- following (objectId)
- Posts (objectId)

# Posts Model:

- slug (string) (unique)
- description (string/image)
- likes (objectId)
