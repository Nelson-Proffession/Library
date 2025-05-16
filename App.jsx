import {react} from 'react';


const App =() =>{

  return(
    <>
    </>
  )
}

export default App;

















































// import axios from "axios";
// import Update from "./componet/update";
// import { useEffect, useState } from "react";
// const App = () => {
//  const [book_name,setbook_name]=useState("");
//  const [author,setauthor]=useState(""); 
//   const [publisher,setpublisher]=useState("");
//   const[data, setdata] =useState([]);

//   const [selecteduser , setselecteduser] = useState(null)
// const Insert = async(e) =>{
//     e.preventDefault();

//     try {

// const res =await axios.post('http://localhost:4000/add',{
//   book_name,
//   author,
//   publisher
// });
// select();
// console.log("data",res.data);
// console.log("user inserted");



 
// } catch (error) {
//    console.error('user not niserted',error )
// }
// }


//   const select = async () =>{
//     try {
//       const res= await axios.get('http://localhost:4000/books')
//       setdata(res.data)
//       console.log(res.data);
      



      
//     }
    
   
//   catch (error) {
//     console.log('NOt selected');
    
      
//   }

// };

// useEffect(()=>{
// select();
// },[])

// const HandleDelete = async (e,id) =>{
// e.preventDefault();
// try{
// await axios.delete(`http://localhost:4000/delete/${id}`);
// setdata(data.filter((user)=>user.id!==id))
// select();
// }
// catch(error){
// console.error(error);

// }
// }
// return(
//   <>
//         <table>
//           <tr>
//             <th>id</th>
//             <th>Book_name</th>
//             <th>author</th>
//             <th>publisher</th>
//             <th>action</th>
            
//           </tr>
// {data.map((user)=>(
// <tr key={user.id}>
// <td>{user.id}</td> 
// <td>{user.book_name}</td> 
// <td>{user.author}</td>
// <td>{user.publisher}</td>
// <td><button onClick={(e)=>HandleDelete(e,user.id)}>delete</button></td>
// <td><button onClick={(e)=>setselecteduser(user)}>update</button></td>
// </tr>
// ))}
//         </table>
//   <form action="" method="post" onSubmit={Insert}>
//   <label>Boook Name</label>
//   <input type="text" name="book_name" id="book_name" value={book_name } onChange={(e)=>setbook_name(e.target.value)}/><br></br>
//   <label>Author</label>
//   <input type="text" name="author" id="author"  value={author}onChange={(e)=>setauthor(e.target.value)}/><br />
//   <label>Publisher</label>
//   <input type="text" name="publisher" id="publisher"value={publisher}onChange={(e)=>setpublisher(e.target.value)} /><br />
//   <button type="submit">Add Book</button>
//   <button type="reset">cancel</button>



//   </form>
//   </>

// )
// {
//   // selecteduser &&(
//   <Update user={selecteduser} FetchData={select}/>
//   )
//   }
// }

// export default App;
