import React from "react";
import Itemcard from "./itemcard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useSelector } from "react";

function ProductForm () {
    const [variants, setVariants] = useState([{ variant: '', price: '' }]);

    // Handler to update variant and price values
    const handleChange = (index, field, value) => {
      const newVariants = [...variants];
      newVariants[index][field] = value;
      setVariants(newVariants);
    };
  
    // Handler to add a new variant-price pair
    const addVariant = () => {
      setVariants([...variants, { variant: '', price: '' }]);
    };
  
    // Handler to remove a variant-price pair
    const removeVariant = (index) => {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    };
  
    // Handler to submit the form data
    const handleSubmit = (e) => {
      e.preventDefault();
      // Process variants and prices here (e.g., send to backend or update state)
      console.log('Variants and prices:', variants);
    };

    return (
        <div >
       <form style={{paddingTop:"200px", width:"600px", flex:"center", marginLeft:"510px", backgroundColor:"antiquewhite", paddingLeft:"20px",paddingRight:"20px" , borderRadius:"20px"}}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>


  {variants.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' ,display: 'flex', alignItems: 'center', marginTop:"30px" }}>
          <input
          class="form-control" 
          style={{width:"150px"}}
            type="text"
            placeholder="Variant (e.g., Color, Size)"
            value={item.variant}
            onChange={(e) => handleChange(index, 'variant', e.target.value)}
            required
          />
          <input
          class="form-control" 
          style={{width:"150px" , marginLeft:"20px"}}
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(index, 'price', e.target.value)}
            required
          />
          {variants.length > 1 && (
            <button type="button" onClick={() => removeVariant(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

<button type="button" class="btn btn-primary" onClick={addVariant}>Add Another Variant</button>



  <button style={{marginTop:"30px", marginBottom:"30px"}}  type="submit" class="btn btn-primary">Submit</button>


  


</form>
    </div>
    );
  }
  
  export default ProductForm;
