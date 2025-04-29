let items = []; // In-memory data store
let nextId = 1; // Simple ID counter

// Create (POST)
exports.createItem = (req, res) => {
    try {
        const { name, description, price} = req.body;
        const newItem = { name, description, price,id: nextId++}
        items.push(newItem);
        //  write logic to add to the array  
         
        

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error creating item', error });
    }
};

// Read/View (GET)
exports.getItems = (req, res) => {
    try {
       console.log(items);
       
        res.status(200);
      res.json(items);



        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

// Get by ID (GET)
exports.getItemById = (req, res) => {
    try {

        const {id} = req.params
        const item = items.find(e=>e.id === parseInt(id))  

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
};

// Update (PUT)
exports.updateItem = (req, res) => {
    try {
        

        let {id} = req.params
         id = parseInt(id)
         const index = id - 1 ;
         const  { name, description, price} = req.body 
         items = items.map(e=> {
            if (e.id === id ) 
                return {...e,  name, description, price}
            return e 
         })

        // write content to update the items based on id


        res.status(200).json(items[index]);
    } catch (error) {
        res.status(400).json({ message: 'Error updating item', error });
    }
};

// Delete (DELETE)
exports.deleteItem = (req, res) => {
    try {
        let {id} = req.params
        id = parseInt(id)
        items = items.filter(e=>e.id != id)

        // write content to delete the item

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
