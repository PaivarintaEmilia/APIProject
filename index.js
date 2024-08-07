import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://openlibrary.org/search.json?q=";


app.use(bodyParser.urlencoded({ extended: true }));


// Include public files
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", { books: [] });
})

// Function to get the data from API endpoint
app.post("/get-books", async (req, res) => {

    const searchWord = req.body.search;

    const config = {
          headers: { "User-Agent": "AppForLearningAPI/1.0 addYourEmailHere" },
    };

    try {

        const apiResponse = await axios.get(API_URL + searchWord, config);

        // Extract relevant details from the response
        const books = apiResponse.data.docs.slice(0, 20).map(book => ({
            title: book.title,
            author_name: book.author_name ? book.author_name.join(', ') : 'Unknown',
            publish_year: book.first_publish_year || 'Unknown'
        }));

        res.render("index.ejs", { books: books });
    } catch (error) {
        console.error(error);
        res.render("index.ejs", { books: [], error: "Failed to fetch data from API" });
    }

})

// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });