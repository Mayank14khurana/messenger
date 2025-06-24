'use client'
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input/Input";
import Button from "./input/button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN');
    const [loading, setLoading] = useState<boolean>(false);
    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant('REGISTER');
        }
        else {
            setVariant('LOGIN');
        }
    }, [variant])

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        if (variant === 'LOGIN') {
           signIn('credentials',{
            ...data,redirect:false
           }).then((callback)=>{
            if(callback?.error){
                toast.error('Invalid credentials');
            }
            if(callback?.ok){
                toast.success('Logged in successfully');
            }
           }).finally(()=>setLoading(false));
        }
        if (variant === 'REGISTER') {
            axios.post('/api/register',data).catch(()=>toast.error("Something went wrong")).finally(()=> setLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setLoading(true);
        signIn(action,{redirect:false}).then((callback)=>{
            if(callback?.error){
                toast.error('Invalid credentials');
            }
             if(callback?.ok){
                toast.success('Logged in successfully');
            }
        }).finally(()=>setLoading(false));
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:px-10 sm:rounded-lg ">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >

                    {variant === 'REGISTER' && (
                        <Input label="Name" register={register} id="name" type="text" disabled={loading} errors={errors} />
                    )}

                    <Input label="Email" register={register} id="email" type="email" disabled={loading} errors={errors} />
                    <Input label="Password" register={register} id="password" type="password" disabled={loading} errors={errors} />
                    <div>
                        <Button disabled={loading} type="submit" fullWidth>
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute flex items-center inset-0">
                            <div className="w-full border-t border-gray-300 " />

                        </div>
                        <div className="flex relative justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm text-gray-500 mt-6 px-2">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger? ' : 'Already have an account'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                      {
                        variant === 'LOGIN' ? 'Create an account' : 'Login'
                      }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
