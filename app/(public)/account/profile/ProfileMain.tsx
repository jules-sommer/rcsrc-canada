'use client';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { atom, useAtom, useAtomValue } from 'jotai';

import { sessionAtom, serverSessionAtom, asyncSessionAtom } from "../../../_providers/JotaiProvider";

const tabsAtom = atom<String[]>([
    "About You",
    "Addresses",
    "Your Orders"
]);


import { UserSession } from "../../../_atoms/userAtom";

const zTabs = z.union([z.literal(0), z.literal(1), z.literal(2)]);
type Tabs = z.infer<typeof zTabs>

const activeTabAtom = atom<Tabs>(0)
const isLoadingAtom = atom(false);
const updateUserAtom = atom(null)

export const EditProfile = ({ serverSession, updateUser } : { serverSession: UserSession, updateUser: Function }) => {

    const { state, data: { authenticated, session } } = useAtomValue<any>(asyncSessionAtom);
    const [_, setSession] = useAtom(sessionAtom);

    const [tabs, ] = useAtom(tabsAtom); 
    const [activeTab, setActiveTab] = useAtom(activeTabAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const EditProfileForm = z.object({
        name:              z.coerce.string().min(1, { message: `At least tell us your name, c'mon!` }),
        email:             z.coerce.string()
                            .email({ message: `Are you sure that's an email, chief?` })
                            .min(3, { message: `Email must be at least 3 characters, otherwise that's a damn cool email address... I'm jealous.` }),
        company:           z.coerce.string(),
        researchIntent:    z.coerce.string()
                            .min(10, { message: `Letter of research intent must be at least 40 characters!` })
                            .max(750, { message: `Letter of research intent must be less than 500 characters!` })
    });

    type EditProfileSchema = z.infer<typeof EditProfileForm>;

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: {
            errors
        }
    } = useForm<EditProfileSchema>({

        resolver: zodResolver(EditProfileForm),
        delayError: 1000,
        defaultValues: async () => {

            if( session.user )
                return { ...session.user };

        },

    });

    const handleSubmitEditProfile = async (data) => {

        setIsLoading(true);

        // Create a new user object with the updated data from the form, and the existing data from the session object.

        setSession({
            ...session,
            user: {
                ...session.user,
                ...data
            }
        });

        const res = await updateUser(session);

        console.log(res);

        // send it to the server to be updated via Next-Auth's update function which will spit out a trigger and a new session object
        // in the callback function session() which we can then use to update our redux store and the database.

        setIsLoading(false);

    };

    return (

        <div className="flex flex-col w-full h-min">

            <div className="p-8 w-full flex flex-col prose h-min">

                <h1>Tell us more about yourself!</h1>
                <p>Thank you for creating an account with RCSrc Canada, after filling out the required onboarding form below, you will be automatically approved enabling you to place orders with us! You will know when your account is approved when you receive the "customer" badge on your profile. If you haven't done so already, please give us a bit of information about yourself and or your research organization so that we can better serve you!</p>

            </div>

            <div className="m-8 tabs tabs-boxed flex justify-between">
                {tabs.map((tab, index) => (<button id={index.toString()} onClick={() => {
                    setActiveTab(index as Tabs);
                }} className={`tab tab-lg font-mono text-md font-bold flex-grow ${activeTab === index ? 'tab-active !bg-accent' : null}`}>{tab}</button>))}
            </div>

            <form onSubmit={handleSubmit(handleSubmitEditProfile)} className="form-control w-ful p-8">

                {!isLoading ? (

                    <>

                        <div className="form-control w-full grid grid-cols-2 gap-6 grid-rows-1">

                            <div>

                                <label className="label">
                                    <span className="label-text">Full name</span>
                                </label>
                                <input type="text" {...register("name", { required: false })} className="input input-bordered input-info w-full font-mono" />
                                <label className="label self-end opacity-70">
                                    <span className="label-text-alt">Required</span>
                                </label>

                            </div>
                            <div>

                                <label className="label">
                                    <span className="label-text">Company name</span>
                                </label>
                                <input type="text" placeholder="If so, please enter your company's name here!" {...register("company", { required: false })} className="input input-bordered input-info w-full font-mono" />

                            </div>

                        </div>

                        <div className="form-control w-full">

                            <label className="label">
                                <span className="label-text">Is this the email you'd like us to reach you at?</span>
                            </label>

                            <div className="tooltip tooltip-secondary" data-tip={process.env.NEXT_PUBLIC_EMAIL_CHANGE_TOOLTIP}>

                                <input type="text" {...register("email", { required: false })} disabled className="input input-bordered input-info w-full font-mono" />

                                <label className="label self-end opacity-70">
                                    <span className="label-text-alt">Please contact us if you need to change your email!</span>
                                </label>
                        
                            </div>

                        </div>

                        <div className="form-control py-4">
                            <label className="label">
                                <span className="label-text">Your statement of research intent:</span>
                            </label>
                                <textarea className="textarea textarea-bordered textarea-info !h-56" {...register("researchIntent", { required: false })} placeholder="Your letter of research intent, don't worry, we take safety seriously but are not biased towards any particular field of research."/>
                            <label className="label items-start">
                                <span className="label-text-alt pr-2">{process.env.NEXT_PUBLIC_RESEARCH_INTENT_REQUIRED}</span>
                                <span className="label-text-alt">Required</span>
                            </label>
                        </div>

                        <button type="submit" className={`
                            btn btn-primary w-min flex-nowrap whitespace-nowrap self-end flex flex-row
                            text-sky-100/80 hover:text-sky-100 hover:scale-105 hover:translate-y-[-3px] transition-all ease-in-out`}>
                            <p className="inline-block">Update Profile</p>
                            <span className="material-symbols-rounded inline-block">send</span>
                        </button>

                    </>

                ) : (

                    <div className="w-full h-full flex items-center justify-center"><span className="loading loading-ring loading-lg"></span></div>

                )}

            </form>

        </div>

    )


}