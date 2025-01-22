import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        id: "",
        name:"",
        username:"",
        email:""
    },
    reducers:{
        createUser:(state,action)=>{
            state.id = action.payload._id
            state.name=action.payload.name
            state.username=action.payload.username
            state.email=action.payload.email
        },
        logoutUser:(state)=>{
             state.id= ""
            state.name=""
            state.username=""
            state.email=""
        },
        
    }
    
})
// export const fetchStudentDetails = createAsyncThunk("user/fetchUserDetails", async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/users/getdetails/${userId}`);
//       return response.data.user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data.message || "Error fetching user details");
//     }
//   });
export const updateStudentDetails = createAsyncThunk("user/updateUserDetails", async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/update/${userDetails.id}`, userDetails);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || "Error updating user details");
    }
  });
export const {createUser,logoutUser}=userSlice.actions
export const{reducer: userReducer}=userSlice