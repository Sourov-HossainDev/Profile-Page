import React, { createRef, useState } from 'react'
import { MdCreate } from "react-icons/md";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { getAuth, signOut, updateProfile } from "firebase/auth"
import { userLoginInfo } from '../../slice/UserSlice'
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref as realRef, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const auth = getAuth();
    const storage = getStorage();
    const db = getDatabase();

    const dispatch = useDispatch();
    const naviget = useNavigate();
    const Data = useSelector(state => state.userLoginInfo.userInfo.user)
    console.log(Data);


    const [coverPhotoUpload, setCoverPhotoUpload] = useState(false);
    const [profilImaageUploadUI, setProfilImaageUploadUI] = useState(false);
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState('');
    const cropperRef = createRef();

    const uploadCoverPhoto = () => {
        setCoverPhotoUpload(true);
    }
    const coverImageCancelButton = () => {
        setCoverPhotoUpload(false);
        setImage('');
        setCropData('')

    }

    const uploadProfilePhoto = () => {
        setProfilImaageUploadUI(true);
    }
    const profileImageCancelButton = () => {
        setProfilImaageUploadUI(false);
        setImage('');
        setCropData('')
    }




    const SelectImage = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        console.log(files, 'sourov');
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());


            const storageRef = ref(storage, auth.currentUser.uid);
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    }).then(() => {
                            toast.success('Profile Picture Upload Successfull');
                            setTimeout(() => {
                                naviget('/Profile')
                            }, 1000);
                            setProfilImaageUploadUI(false);
                            setImage('');
                            cropData('')

                        })
                });
            });
        }
    };

    return (
        <>
            <div className=' '>
                <div className='w-[1000px] mx-auto font-nunito  '>
                    <ToastContainer position="top-center" autoClose={1000} theme="dark" />
                    <div className='relative bg-[#bdc3c7] object-cover bg-no-repeat  w-[1000px] h-[350px]  border-4 '>
                        <img className='rounded-full mx-auto w-full h-full' src={Data.photoURL} />
                        <MdCreate onClick={uploadCoverPhoto} className='absolute top-[30px] right-[30px] text-4xl cursor-pointer ' />
                    </div>
                    <div className='relative'>
                        <div className='w-[220px] h-[220px] rounded-full border-4 absolute top-[-120px] left-[385px] relative bg-[#bdc3c7]   '>

                            <div className='absolute  top-0 left-0 w-full h-full rounded-full   flex justify-center items-center cursor-pointer     '>
                                <RiUploadCloud2Fill onClick={uploadProfilePhoto} className='  text-3xl' />
                            </div>


                        </div>



                    </div>

                    <div className='relative'>
                        <p className='bg-white  w-[600px] text-center m-auto rounded-[50px] py-[20px] font-bold text-[20px] cursor-pointer '>What's on your mind ? </p>
                        <div className='w-[50px] h-[50px] rounded-full bg-[#bdc3c7] absolute top-[10px] left-[210px]  '></div>
                    </div>
                    {
                        coverPhotoUpload &&
                        <div>
                            <div className='absolute top-0 left-0 w-full h-screen z-50 bg-PurpleBlue items-center flex'>
                                <div className='w-1/2 py-[20px] px-[15px] bg-white m-auto rounded-[20px]  '>
                                    <h1 className='font-nunito font-bold text-[28px] text-center border-b-4 border-GlufBlue  pb-[10px] text-GlufBlue mb-[10px] '>Upload Profile Picture</h1>
                                    <div className='text-center'>
                                        <div className='group relative group w-28 h-28 mx-auto overflow-hidden rounded-full mb-[10px] '>
                                            {
                                                image ?
                                                    <div
                                                        className="img-preview w-[50%] h-[50%] "
                                                        style={{ width: "100%", float: "left", height: "300px" }}
                                                    />
                                                    :
                                                    <img className='mx-auto w-full h-full ' src={Data.photoURL} />
                                            }


                                        </div>





                                        <div className='pl-[10px] '>
                                            <input className='pl-[100px] mb-[10px] ' onChange={SelectImage} type="file" />
                                            {
                                                image &&
                                                <Cropper
                                                    ref={cropperRef}
                                                    style={{ height: 400, width: "100%" }}
                                                    zoomTo={0.5}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={image}
                                                    viewMode={1}
                                                    minCropBoxHeight={10}
                                                    minCropBoxWidth={10}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false}
                                                    guides={true}
                                                />
                                            }

                                        </div>
                                        <div className='mt-[10px] '>
                                            <button onClick={getCropData} className='py-[10px] px-[20px] bg-[#2ecc71] rounded-[20px] text-white font-semibold mr-[30px] '>Upload</button>
                                            <button onClick={coverImageCancelButton} className='py-[10px] px-[20px] bg-[#e74c3c] rounded-[20px] text-white font-semibold  '>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        profilImaageUploadUI &&
                        <div>
                            <div className='absolute top-0 left-0 w-full h-screen z-50 bg-PurpleBlue items-center flex'>
                                <div className='w-1/2 py-[20px] px-[15px] bg-white m-auto rounded-[20px]  '>
                                    <h1 className='font-nunito font-bold text-[28px] text-center border-b-4 border-GlufBlue  pb-[10px] text-GlufBlue mb-[10px] '>Upload Profile Picture</h1>
                                    <div className='text-center'>
                                        <div className='group relative group w-28 h-28 mx-auto overflow-hidden rounded-full mb-[10px] '>
                                            {
                                            image ?
                                                <div
                                                    className="img-preview w-[50%] h-[50%] "
                                                    style={{ width: "100%", float: "left", height: "300px" }}
                                                />
                                                :
                                                <img className='mx-auto w-full h-full ' src={Data.photoURL} />
                                        }


                                        </div>




                                        
                                    <div className='pl-[10px] '>
                                        <input className='pl-[100px] mb-[10px] ' onChange={SelectImage} type="file" />
                                        {
                                            image &&
                                            <Cropper
                                                ref={cropperRef}
                                                style={{ height: 400, width: "100%" }}
                                                zoomTo={0.5}
                                                initialAspectRatio={1}
                                                preview=".img-preview"
                                                src={image}
                                                viewMode={1}
                                                minCropBoxHeight={10}
                                                minCropBoxWidth={10}
                                                background={false}
                                                responsive={true}
                                                autoCropArea={1}
                                                checkOrientation={false}
                                                guides={true}
                                            />
                                        }
        
                                    </div>
                                        <div className='mt-[10px] '>
                                            <button onClick={getCropData} className='py-[10px] px-[20px] bg-[#2ecc71] rounded-[20px] text-white font-semibold mr-[30px] '>Upload</button>
                                            <button onClick={profileImageCancelButton} className='py-[10px] px-[20px] bg-[#e74c3c] rounded-[20px] text-white font-semibold  '>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }



                </div>
            </div>
        </>
    )
}

export default ProfilePage