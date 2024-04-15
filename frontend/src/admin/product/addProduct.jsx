import React, {useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";

import { useDispatch } from 'react-redux';
import { addProducts } from '../../redux/actions';
 
const AddProduct = () => {

   const dispatch = useDispatch();

   const [prod, setProd] = useState({
      title : "",
      description : "",
      price : 0,
      category : "",
      brand : "",
      stock : 0,
    })
    const [image, setImage] = useState(null)
 
    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData();

        formData.append('image', image);

         // Append JSON data to FormData
         Object.entries(prod).forEach(([key, value]) => {
            formData.append(key, value);
         });

        dispatch(addProducts(formData));
    }
     
    return ( 
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                    label="Title"
                    onChange={e => setProd( prev => { return {...prev, title: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={prod.title}
                    // error={emailError}
                 />
                 <TextField 
                    label="Description"
                    onChange={e => setProd(prev => { return {...prev, description: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={prod.description}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Price"
                    onChange={e => setProd(prev => { return {...prev, price: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={prod.price}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Category"
                    onChange={e => setProd(prev => { return {...prev, category: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={prod.category}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Brand"
                    onChange={e => setProd(prev => { return {...prev, brand: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={prod.brand}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    label="Stock"
                    onChange={e => setProd(prev => { return {...prev, stock: e.target.value }})}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={prod.stock}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <TextField 
                    // label="image"
                    onChange={e => setImage(e.target.files[0])}
                    required
                    variant="outlined"
                    color="secondary"
                    type="file"
                  //   value={image}
                    // error={textError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
        </form>
        </React.Fragment>
     );
}
 
export default AddProduct;