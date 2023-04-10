import { useEffect, useState } from "react";
import axios from "axios";
import {Button, Card ,CardActions,CardContent, Grid} from "@mui/material"


function AllLiteratures() {
  const [literatures, setLiterature] = useState(null);
  const [updateLiterature,setUpdateLiterature] = useState({
    _id:null,
    passage: "",
    author: "",
    format: "",
    title: "",
    year: null

  })
  const [createLiterature, setCreateLiterature] = useState({
    passage: "",
    author: "",
    format: "",
    title: "",
    year: null
  });

  useEffect(() => {
    fetchLiteratures();
  }, []);

  const fetchLiteratures = async () => {
    const res = await axios.get("http://localhost:3001/posts");
    setLiterature(res.data);
  };
  console.log(literatures);

  const handlecreatechange = (e) => {
    const { name, value } = e.target;
    setCreateLiterature({
      ...createLiterature,
      [name]: value,
    });

  };
  const handeCreateLiterature = async(e)=>{
    e.preventDefault()
    
    const res = await axios.post("http://localhost:3001/posts",createLiterature)
    
    
    setLiterature([...literatures,res.data])
    
    setCreateLiterature({ 
         passage: "",
    author: "",
    format: "",
    title: "",
    year: null
})
    
alert("Literature Added Succeccfully ,Please refresh the page")
    }

    const handleUpdateliterature = (e)=>{
        const {value,name} = e.target
      
      
        setUpdateLiterature({
          ...updateLiterature,
          [name]:value
        
        })
      }

      const toggleUpdate = (item) =>{
        setUpdateLiterature ({title:item.title,passage:item.passage,format:item.format,year:item.year,author:item.author,_id:item._id})
        }
        
        const createUpdateLiterature = async(e)=>{
        e.preventDefault()
        
        const {title,passage,format,year,author} = updateLiterature
        
        const res  = await axios.put(`http://localhost:3001/posts/${updateLiterature._id}`,{title,passage,format,year,author})
        
        
        const newliterature = [...literatures]
        const noteIndex = newliterature.findIndex((item)=>{
          return item._id === updateLiterature._id
        })
        newliterature[noteIndex] = res.data
        setLiterature(newliterature)
        
        setUpdateLiterature({
            _id:null,
            passage: "",
            author: "",
            format: "",
            title: "",
            year: null
        
        })
        }

        const handleDelete = async(_id)=>{
            await axios.delete(`http://localhost:3001/posts/${_id}`)
            const newLiteratures = [...literatures].filter((item)=>{
              return item._id !== _id;
            })
            setLiterature(newLiteratures)
            }


  return (
    <div>
        <h1 style={{textAlign:"center"}}>All Literatures</h1>
        <div style={{justifyContent:"center" ,alignItems:"center",display:"flex", }}>
 

        {literatures &&
        literatures.map((item, key) =>(
<div style={{padding:"5%"}}>
<Card sx={{ maxWidth: 345 , }}>

<div>
<CardContent>
<h2>{item.passage}</h2>

<p>Passage : &nbsp;&nbsp;<span style={{fontSize:30}}>{item?.title}</span></p>
<p> Author : &nbsp;&nbsp;<span style={{fontSize:30}}>{item?.author}</span></p>
<p>Format : &nbsp;&nbsp;<span style={{fontSize:30}}>{item?.format}</span></p>
<p>Year  : &nbsp;&nbsp;<span style={{fontSize:30}}>{item?.year}</span></p>
</CardContent>
<CardActions>
<Button onClick={()=>toggleUpdate(item)}>Update</Button>
<Button onClick={()=>handleDelete(item._id)} >Delete</Button>
</CardActions>
</div>

</Card>
</div>

      
      ))}
        </div>
        <div>


       
</div>

      
      {/* create literature */}
      
      <div style={{justifyContent:"center" ,alignItems:"center",display:"flex", }}>
       {!updateLiterature._id && (

<div>
<h1>
    Create Literature
</h1>

<Card sx={{ maxWidth: 345 }}>
     
      <CardContent >
      <form onSubmit={handeCreateLiterature}>
          <input
          style={{margin:"5%"}}
            type="text"
            onChange={handlecreatechange}
            value={createLiterature.passage}
            placeholder="passage"
            name="passage"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handlecreatechange}
            value={createLiterature.title}
            placeholder="title"
            name="title"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handlecreatechange}
            value={createLiterature.author}
            placeholder="author"
            name="author"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handlecreatechange}
            value={createLiterature.format}
            placeholder="format"
            name="format"
          />
          <input
            type="number"
            style={{margin:"5%"}}
            onChange={handlecreatechange}
            value={createLiterature.year}
            placeholder="year"
            name="year"
          />
          <br/>
          <button type="submit" style={{margin:"5%"}}> Create Literature</button>
        </form>

      </CardContent>

</Card>
</div>        


       
       )} 
       
      </div>



<div style={{justifyContent:"center" ,alignItems:"center",display:"flex", }}>
{updateLiterature._id && (
    <div>
 <h1>
    update Literature
</h1>
<Card sx={{ maxWidth: 345 }}>
     
      <CardContent>
     
<form onSubmit={createUpdateLiterature}>
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handleUpdateliterature}
            value={updateLiterature.passage}
            placeholder="passage"
            name="passage"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handleUpdateliterature}
            value={updateLiterature.title}
            placeholder="title"
            name="title"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handleUpdateliterature}
            value={updateLiterature.author}
            placeholder="author"
            name="author"
          />
          <input
            type="text"
            style={{margin:"5%"}}
            onChange={handleUpdateliterature}
            value={updateLiterature.format}
            placeholder="format"
            name="format"
          />
          <input
            type="number"
            style={{margin:"5%"}}
            onChange={handleUpdateliterature}
            value={updateLiterature.year}
            placeholder="year"
            name="year"
          />
          <br/>
          <button type="submit"  style={{margin:"5%"}}> UpdateLiterature</button>
        </form>
      </CardContent>
      
    </Card>




</div>
)}
</div>







    </div>
  );
}

export default AllLiteratures;
