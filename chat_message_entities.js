{
  "name": "ChatMessage",
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "description": "The message content"
    },
    "sender": {
      "type": "string",
      "enum": [
        "user",
        "ai"
      ],
      "description": "Who sent the message"
    },
    "policy_id": {
      "type": "string",
      "description": "Related policy if applicable"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "When message was sent"
    }
  },
  "required": [
    "message",
    "sender"
  ]
}
