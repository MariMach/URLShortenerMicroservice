# URLShortenerMicroservice
APIs and Microservices Projects - URL Shortener Microservice

[Glitch deploy](https://mariam-machaallah-freecodecamp-myproject3.glitch.me/)

User Stories :
1. You can POST a URL to [project_url]/api/shorturl/new and you will receive a shortened URL in the JSON response.
Example : {"original_url":"www.google.com","short_url":1}

2. If you pass an invalid URL that doesn't follow the valid http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}.

3. When you visit the shortened URL, it will redirect you to your original link.
