{
  "name": "Policy",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the policy/legislation"
    },
    "original_text": {
      "type": "string",
      "description": "Original policy text"
    },
    "simplified_summary": {
      "type": "string",
      "description": "AI-generated simplified summary"
    },
    "key_points": {
      "type": "array",
      "description": "Key points extracted",
      "items": {
        "type": "string"
      }
    },
    "document_url": {
      "type": "string",
      "description": "URL to original document"
    },
    "category": {
      "type": "string",
      "enum": [
        "ballot",
        "legislation",
        "proposition",
        "ordinance",
        "regulation",
        "other"
      ],
      "description": "Type of policy"
    },
    "is_bookmarked": {
      "type": "boolean",
 
