import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '../service/supabase';

function AuthProvider(props) {

    const { children } = props;

    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.log(error);
                    throw error;
                }

                if (data.session) {
                    setUser(data.session.user);
                    console.log(`session found`);
                } else {
                    console.log(`no session found !`);
                    setUser(null)
                }

            } catch (error) {
                console.log(error.message);
            }finally{
                setLoading(false);
            }
        }

        checkAuth();
    }, [])


    const login = async (email, password) => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;

        console.log(data);
        setUser(data.user)
        console.log(data.user);
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if(error) console.log(error);
        console.log(`User Logged out !!`);
        setUser(null);
    }
    

    const register = async(name,email,password)=>{

        const {data , error} = await supabase.auth.signUp({
            email:email,
            password:password,
            options:{
                data:{
                    display_name: name
                }
            }
        });

        if(error)throw error;

        console.log(`User registered Successfully`);
        console.log(data.session.user);
        setUser(data.session.user);

    }





    return (
        <AuthContext.Provider value={{ login: login, user: user, logout: logout ,register:register , loading:loading }} >
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider
