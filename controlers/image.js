const Clarifai = require('clarifai'); 

//You must add your own API key here from Clarifai.                   
const app = new Clarifai.App({                                        
    apiKey: 'a1fdf1f7f3aa4b46a2f0aa5eb3a6ef90'                        
});     

const handleApiCall = (req, res) => {
    const { input} = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
                res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}
module.exports={handleImage, handleApiCall}
