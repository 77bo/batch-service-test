# How to run app

To start app just execute next commands:  
`npm install` and then `npm start`

# Postman

You can import postman collection `batch-editing-service.postman_collection.json`.
Or build request yourself:
```javascript
POST http://localhost:3000/batch

Requst Body (just to test)
{
	"endpoint": {
		"method": "DELETE",
		"url": "https://guesty-user-service.herokuapp.com/user/{userId}"
	},
	"payload": [
		{
			"userId": 1
		},
		{
			"userId": 2
		},
		{
			"userId": 3
		},
		{
			"userId": 4
		},
		{
			"userId": 5
		},
		{
			"userId": 6
		}
	]
}

```
## Example Response

```javascript
{
    "total": 7,
    "success": 7,
    "failed": 0,
    "results": [
        {
            "task": {
                "userId": 1,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        },
        {
            "task": {
                "userId": 2,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        },
        {
            "task": {
                "userId": 3,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        },
        {
            "task": {
                "userId": 5,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        },
        {
            "task": {
                "userId": 4,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 2
        },
        {
            "task": {
                "userId": 6,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        },
        {
            "task": {
                "userId": 7,
                "name": "Bob"
            },
            "success": true,
            "status": 200,
            "attempt": 1
        }
    ]
}
```