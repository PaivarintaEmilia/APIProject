# APIProject information

The project is made by using the **https://openlibrary.org/** API. 

In program user can search books with the different search words. Program show a list of books that match with the users search word. 

## Initial commands

```
npm i
```

```
nodemon index.js
```

## Add your email to the header 

1. Go to a file index.js
2. Add your email to the header of the API request done with axios

```
    const config = {
          headers: { "User-Agent": "AppForLearningAPI/1.0 addYourEmailHere" },
    };
```

