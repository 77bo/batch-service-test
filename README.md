#How to run app

To start app just execute next commands:  
`npm install` and then `npm start`

#Postman

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