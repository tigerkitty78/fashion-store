import axios from 'axios';

export const getAllitems = () => async (dispatch) => {
  dispatch({ type: 'GET_ITEMS_REQUEST' });

  try {
    const response = await axios.get('http://localhost:5000/api/items/getallitems');
    console.log(response);
    dispatch({ type: 'GET_ITEMS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_ITEMS_FAILED', payload: error.message });
  }
}
