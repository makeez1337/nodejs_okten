import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {userService} from "./services/userService";


const App = () => {

    const {reset, handleSubmit, register} = useForm();

    const [users, setUser] = useState([]);

    const submit = async (user) =>  {
        await userService.createUser(user);
        reset();
    }

    const getAllUsers = async () => {
        const { data } = await userService.getAll();
        setUser(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>firstName:<input type="text" {...register('firstName')}/></label></div>
                <div><label>lastName:<input type="text" {...register('lastName')}/></label></div>
                <div><label>email:<input type="text" {...register('email')}/></label></div>
                <div><label>age:<input type="number" {...register('age')}/></label></div>
                <div><label>password:<input type="text" {...register('password')}/></label></div>
                <div><label>phone:<input type="text" {...register('phone')}/></label></div>
                <button>CREATE</button>
            </form>
            <hr/>
            <div>
                <button onClick={getAllUsers}>GET ALL USERS</button>
                { users.length && JSON.stringify(users)}
            </div>
        </div>

    );
};

export {App};