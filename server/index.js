const express = require("express"); 
const cors = require("cors"); 
const Axios = require("axios"); 
const app = express(); 
const PORT = 8000; 

app.use(cors()); 
app.use(express.json()); 

app.post("/compile", (req, res) => { 
	//getting the required data from the request 
	let code = req.body.code; 
	let language = req.body.language; 
	let input = req.body.input; 
	if (language === "python") { 
		language = "py"
	} 

	let data = {    
        'source': code,
        'lang': language,
        'time_limit': 5,
        'memory_limit': 246323,
        'input': input,
        'callback' : "https://client.com/execute/result/",
        'id': "c1c7d0e1cc61eafd43c21367d023b5d66fae703ba61c.api.hackerearth.com"
    }
 
	let config = { 
        method: 'post',
        url: 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/', 
        data : data,
        headers: { 
            'cache-control': 'no-cache',
            'client-secret': '5261fa201895e4ec40eaafe30fed183ffe686465',
            'content-type': 'application/json'
        }, 
        
	}; 
	//calling the code compilation API 
	Axios(config) 
		.then((response) => { 
			res.send(response.data) 
			console.log(response.data) 
		}).catch((error) => { 
			console.log(error); 
		}); 
}) 

app.listen(process.env.PORT || PORT, () => { 
	console.log(`Server listening on port ${PORT}`); 
});
