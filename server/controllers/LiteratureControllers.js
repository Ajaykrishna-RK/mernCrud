const Litreature = require("../models/Literature");

const FetchAllLiteratures = async (req, res) => {
const literatures = await Litreature.find()

res.json(literatures)
};

const PostLitrature = async (req, res) => {
  const passage = req.body.passage;
  const author = req.body.author;
  const format = req.body.format;
  const title = req.body.title;
  const year = req.body.year;

const literatures = await Litreature.create({
  passage:passage,
  author:author,
  format:format,
  title:title,
  year:year
})

  res.json({  literatures: literatures});
};


const FetchLiterature =  async (req, res) => {
  const literatureId = req.params.id
  
      const posts = await Litreature.findById(literatureId);
    
      res.json(posts);
    }

const UpdateLiterature = async (req, res) => {

  const literatureId = req.params.id
  const passage = req.body.passage;
  const author = req.body.author;
  const format = req.body.format;
  const title = req.body.title;
  const year = req.body.year;

await Litreature.findByIdAndUpdate(literatureId,{
  passage:passage,
  author:author,
  format:format,
  title:title,
  year:year
})

const updateLiterature = await Litreature.findById(literatureId)
    
res.json(updateLiterature) 

};


const deleteLiterature = async(req,res)=>{
  const noteId = req.params.id

  const deleteNote = await Litreature.findByIdAndDelete(noteId)

  res.json(deleteNote)
}


module.exports = {
  FetchAllLiteratures,
  PostLitrature,
  UpdateLiterature,
  FetchLiterature,
  deleteLiterature
};
