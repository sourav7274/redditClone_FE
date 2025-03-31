import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input,Typography } from "@material-tailwind/react";


const UserPage = () => {
    const {id} = useParams();
    const currentUser = useSelector(state => state.user.currentUser)
    // console.log(currentUser);
    return (
        <>
            <div className="bg-redditBlack p-5 text-white min-h-screen grid grid-flow-col grid-cols-3">
                <div className="col-span-1 bg-blue-gray-300 col-span-1">
                    <div className="relative flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col rounded-xl bg-clip-border shadow-xl shadow-blue-gray-900/5">
                        <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base text-gray-300">
                            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Inbox</div>
                            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded">Settings</div>
                            <Link to="/" className="p-3 hover:bg-gray-700 cursor-pointer rounded">Log Out</Link>
                        </nav>
                    </div>
                </div>
                <div className="col-span-2 p-5 ">
                    <h1>Main Section</h1>
                    <h1>sdfsdfsdfsdf</h1>
                    <img className="h-72 w-72 m-auto mt-5 rounded-full object-cover object-center"  src={currentUser.usrImgUrl || "https://placehold.co/600x400"} alt={currentUser.name || "User_Profile"}/>
                    <p className="text-4xl mt-3">{currentUser.name}</p> 
                    <div className="max-w-80 mt-3">
                         <Input color="white" variant="outlined" label="Name" placeholder={currentUser.name}/> 
                         <Input color="white" variant="outlined" label="Email" placeholder={currentUser.email}/> 
                    </div>  
                    <div>
                    <p className="mt-4 text-3xl">Acitivty History</p>    
                        {currentUser.posts && currentUser.posts.map((post) => (
                            <div className="bg-red-300" key={post._id}>
                                <p>Created Post:  {post.title} </p>
                            </div>
                        ))}
                        {currentUser.comments && currentUser.comments.map((comment) => (
                            <div className="bg-green-400" key={comment._id}>
                                <p>Commneted:  {comment.content} on {comment.postId.title}</p>
                            </div>
                        ))}
                        {currentUser.likedPosts && currentUser.likedPosts.map((like) => {  
                            return (
                                <div className="bg-blue-500" key={like._id}>
                                   
                                    <p>Liked Post : {like.postId.title} from  {like.postId.author.name} </p>
                                </div>
                            );
                        })}
                    </div>                                
                </div>
               
            </div>
        </>
    );
};

export default UserPage;
