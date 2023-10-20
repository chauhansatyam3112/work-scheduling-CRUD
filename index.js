const express=require('express');
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
//  var item="";
//  var workitem="";


// we need to create array for more than one iteam store
// var items=["wake up","solve lc","watch BBT"];
// var work=[];
const app=express();

//ejs set up
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

//css files uesd by express
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB?directConnection=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("connection is successful"))
.catch((err) => console.log(err));



const itemSchema=new mongoose.Schema({
  name:String
});


const Item=new mongoose.model("Item",itemSchema);



const listSchema = new mongoose.Schema({
  name: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

const List = mongoose.model('List', listSchema);

const defaultList=[];


const createItems = async () => {
  try {
    const count = await Item.countDocuments();

    if (count === 0) {
      const item1 = new Item({
        name: "Hi This is To do List"
      });

      const item2 = new Item({
        name: "Hello There"
      });

      const item3 = new Item({
        name: "hey There"
      });

      // defaultList=[item1,item2,item3];
      defaultList.push(item1, item2, item3);

     

      

         await Item.insertMany(defaultList);
    }
  } catch (err) {
    console.error(err);
  }
}


// Call createItems to insert items (if necessary)
createItems();

// const listSchema = new mongoose.Schema({
//   name: String,
//   items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
// });

// const List = mongoose.model("List", listSchema);

// const listSchema=new mongoose.Schema({
//   name:String,
//   items:[itemSchema]
// });



app.get("/", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const foundItems = await Item.find({});

    // Render the page with the data
    res.render("lists", { ListTitle: "Today", newItems: foundItems });
  } catch (err) {
    console.error(err);
    // Handle any errors here
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});



//making the custom parametre for post request

// app.get("/:customListName", async function (req, res) {
//   const customListName = req.params.customListName;

//   try {
//     // Fetch the default list items
//     const defaultItems = await Item.find({ _id: { $in: defaultList.map(item => item._id) } });

//     // Create a new list with the default items
//     const list = new List({
//       name: customListName,
//       items: defaultItems
//     });

//     await list.save();

//     res.send("Custom list created!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.get("/:customListName", async (req, res) => {
  const customListName = req.params.customListName;

  try {
    // Check if a list with the provided name already exists
    const existingList = await List.findOne({ name: customListName });

    if (existingList) {
      // If the list exists, display it
      res.render('lists', { ListTitle: existingList.name, newItems: existingList.items });
    } else {
      // If the list doesn't exist, fetch default items and create a new list
      const defaultItems = await Item.find();
      const newList = new List({
        name: customListName,
        items: defaultItems
      });
      await newList.save();
      
      // Redirect to the newly created custom list route
    
      res.render('lists', { ListTitle: customListName, newItems: defaultItems });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// app.get("/:customListName",function(req,res){
//    const customListName=req.params.customListName;


//    const list=new List({
//     name:customListName,
//     items:defaultList
//    })

//    list.save();

// })


// const createItems=async()=>{

//   try {
//     const item1=new Item({
//       name:"Hi This is To do List"
//     })
    
//     const item2=new Item ({
//       name:"Hello There"
//     })
    
//     const item3=new Item({
//       name:"hey There"
//     })
    
    
    
//   } catch (err) {
//     console.log(err);
    
//   }
  
  
// }
// createItems();



// app.get("/",function(req,res)
// {
    //we can send anything to the server from this function "get";
// var d= new Date();


// var date=d.getDay();
// var day="";

// switch (date) {
//     case 0:
//         day="sunday"
//         break;
//         case 1:
//             day="Monday"
//             break;
//             case 2:
//                 day="Tuesday"
//                 break;
//                 case 3:
//                     day="Wednesday"
//                     break;
//                     case 4:
//                         day="Thursday"
//                         break;
//                         case 5:
//                             day="friday"
//                             break;
//                             case 6:
//                                 day="saturday"
//                                 break;

//     default:
//         break;
// }
// // if(date===2)
// // {
// //     day="weekend";
//     // res.send("<h1>today is holiday</h1>");
//     // res.write("<h1>today is holiday</h1>")
//     // res.write("<h1>today is holiday</h1>")
//     //"kindofDay is key from lists.ejs"
//     // res.render("lists",{kindofDay:"day"});
// // }
// // else{
// //     day="weekday";
//     // res.sendFile(__dirname+"/index.html");
// // }

//    // res.send("Hello");

//using js method "toLocalDateString" method
 

// var options={weekday:"long",day:"numeric",month:"long"

// }
// var day=d.toLocaleDateString("hi-IN",options);

// so if we are adding newItem directly to post and render it it will give error cuz first the get render will 
// load and since it has only value of kindofDay it will serach for newItem value 

//    res.render("lists",{kindofDay:day});
//items is a array
//so get items array into key newItems key
//traverse to its length into ejs to get the list one by one;

// const fun=async()=>{
//   Item.find({})
// .then(foundItems => {
//   if(foundItems.length===0)
//   {
//     const promise=  await Item.insertMany([item1,item2,item3]);

//   }
//   res.render("lists",{ListTitle:"Today",newItems:foundItems});

// })
// .catch(err => {
//   console.error(err);
// });


 
// });




app.post("/",function(req,res){
    
    // console.log(req.body);
    const  itemName =req.body.newItem;

     const item =new Item({
         name:itemName
     })

     item.save();

     res.redirect("/");
    //   {newItem:value,satyam:ejs dynamic}
      // if(req.body.satyam==="Work")
      // {
      //   work.push(item);
      //   res.redirect("/work")
      // }
      // else{
      //   items.push(item);
      //   res.redirect("/")
      // }
     
    // console.log(item);
    // now by rendering we can send the key value to ejs 
    // instead of rendering the data we redirect to the home route and there rendering will take place
    // res.render("lists",{newItem:item});
    // when post request triggers it gets the data from newItem and get stored in to item the that data got redirect to 
    // the get method and then get method finally renders the request  
   
});

app.post("/delete",function(req,res){
  const checkItemId=req.body.checkbox;


  const deleteDocs= async(_id)=>{
    try{
        const promise=await Item.deleteOne({_id});
        console.log(promise);
    }catch(err){
        console.log(err);
    }
        
    }
    
    deleteDocs(checkItemId);

    res.redirect('/')
})
//this is a work route function


// app.get("/work",function(req,res){

//   //use find method to read the items collection
   
  
//     res.render("lists",{ListTitle:"workday",newItems:"workItems"});
// });
app.post("/work",function(req,res){
    workitem=req.body.newItem;
    work.push(workitem);

    res.redirect("/");
})

app.listen(3000,function(req,res){
    console.log("server is Running at 3000");
});


