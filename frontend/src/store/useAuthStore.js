import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'


const BASE_URl = 'http://localhost:5000'

export const useAuthStore = create((set, get)=>({
      authUser: null,
      isSigninUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,
      checkAuth: async ()=>{
            try {
                  const res = await axiosInstance.get('/auth/check');
                  set({authUser: res.data})
                  get().connectSocket()
            } catch (error) {
                  console.log("Error checking auth:", error.message);
                  set({authUser: null})
            }finally{
                  set({isCheckingAuth: false})
            }
      },
      signup: async (data)=>{
            set({isSigninUp: true})
            try {
                  const res = await axiosInstance.post('/auth/signup', data);
                  set({authUser: res.data, isSigninUp: false})
                  toast.success('Signup successful! You can now log in.');
                  get().connectSocket()
            } catch (error) {
                  toast.error('Error signing up: '+ error.message);
            }finally{
                  set({isSigninUp: false})
            }
      },

      logout: async ()=>{
            try{
                  await axiosInstance.post('/auth/logout');
                  set({authUser: null})
                  toast.success('Logged out successfully!');
                  get().disconnectSocket()
            }catch(e){
                  toast.error('Error logging out: '+ e.message);
            }
      },

      login: async (data)=>{
            set({isLoggingIn: true})
            try {
                  const res = await axiosInstance.post('/auth/login', data);
                  set({authUser: res.data});
                  toast.success('Logged in successfully!');
                  get().connectSocket()
            } catch (error) {
                  toast.error('Error in login : '+ error.message);
            }finally{
                  set({isLoggingIn: false})
            }
      },

      updateProfile: async (data)=>{
            set({isUpdatingProfile: true})
            try {
                  const res = await axiosInstance.put('/auth/update-profile', data);
                  console.log(res.data)
                  set({authUser: res.data});
                  toast.success('Profile updated successfully!');
            } catch (error) {
                  console.log(error.message)
                  toast.error("error in update profile", error.message);
            }finally{
                  set({isUpdatingProfile: false})
            }
      },
      connectSocket: async ()=>{
            const {authUser} = get();
            if(!authUser || get().socket?.connected) return;
            const socket = io(BASE_URl, {
                  query:{
                        userId: authUser._id
                  }
            })
            socket.connect();
            set({socket: socket});

            socket.on('getOnlineUser', (userIds) =>{
                  set({onlineUsers: userIds})
            })
      },

      disconnectSocket: async ()=>{
            if(get().socket?.connected) get().socket.disconnect();
      },
}))