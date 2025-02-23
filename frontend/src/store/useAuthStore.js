import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import { AwardIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
      authUser: null,
      isSigninUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      checkAuth: async ()=>{
            try {
                  const res = await axiosInstance.get('/auth/check');
                  set({authUser: res.data})
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
            } catch (error) {
                  toast.error('Error in login : '+ error.message);
            }finally{
                  set({isLoggingIn: false})
            }
      }
}))