import React from 'react'
import { useNavigate } from 'react-router-dom'

const CoverPhotoUpload = () => {
    const naviget =useNavigate()
    

    const imageChancelButton = () => {
        naviget('/Profile')
        
      }

    return (
        <>
            <div>
                <div className='absolute top-0 left-0 w-full h-screen z-50 bg-PurpleBlue items-center flex'>
                    <div className='w-1/2 py-[20px] px-[15px] bg-white m-auto rounded-[20px]  '>
                        <h1 className='font-nunito font-bold text-[28px] text-center border-b-4 border-GlufBlue  pb-[10px] text-GlufBlue mb-[10px] '>Upload Profile Picture</h1>
                        <div className='text-center'>
                            <div className='group relative group w-28 h-28 mx-auto overflow-hidden rounded-full mb-[10px] '>
                                {/* {
                                    image ?
                                        <div
                                            className="img-preview w-[50%] h-[50%] "
                                            style={{ width: "100%", float: "left", height: "300px" }}
                                        />
                                        :
                                        <img className='mx-auto w-full h-full ' src={Data.photoURL} />
                                } */}


                            </div>




{/* 
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

                            </div> */}
                            <div className='mt-[10px] '>
                                <button  className='py-[10px] px-[20px] bg-[#2ecc71] rounded-[20px] text-white font-semibold mr-[30px] '>Upload</button>
                                <button onClick={imageChancelButton}  className='py-[10px] px-[20px] bg-[#e74c3c] rounded-[20px] text-white font-semibold  '>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoverPhotoUpload