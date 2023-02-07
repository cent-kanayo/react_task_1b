import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../authContext';
import { GlobalContext, showToast } from '../globalContext';
import MkdSDK from '../utils/MkdSDK';

import Photo from '../images/photo.jpg';

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: global } = React.useContext(GlobalContext);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/admin/login');
    showToast(global, 'Logout successful!');
  };

  React.useEffect(() => {
    console.log('Hello');
    const fetchVideos = async () => {
      let sdk = new MkdSDK();
      sdk.setTable('video');
      const videos = await sdk.callRestAPI({ page }, 'PAGINATE');
      console.log(videos);
      setVideos(videos);
    };
    fetchVideos();
  }, [page]);

  const handleClick = (value) => {
    if (value === 'prev') {
      if (page <= 0) {
        setPage(0);
      } else {
        setPage(page - 1);
      }
    } else if (value === 'next') {
      setPage(page + 1);
    }
  };

  console.log(videos);

  if (!videos?.list?.length) return <h1>Loading...</h1>;
  return (
    <>
      <div className="bg-[#111111] w-full ">
        <header className="px-6 flex justify-between items-center mb-[71px] max-w-[1216px] mx-auto">
          <h3 className="text-white font-extrabold text-[48px]">App</h3>
          <button
            onClick={handleLogout}
            className="block w-[128px] h-[48px] bg-[#9BFF00] rounded-[40px] text-[#050505]"
          >
            Logout
          </button>
        </header>
        <section className="max-w-[1216px] mx-auto mb-[36px] flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between items-center">
          <div>
            <h4 className="text-white font-[100] text-[20px] md:text-[40px]">
              Today’s leaderboard
            </h4>
          </div>
          <div className="bg-[#1D1D1D] w-[418px] h-[56px] rounded-[16px] flex items-center justify-between px-[24px] py-[18px]">
            <p className="font-normal text-[16px] text-white opacity-75">
              {new Date().toDateString()}
            </p>
            <span className="flex items-center justify-center w-[4px] h-[4px]">
              <p className="text-2xl mb-3 text-[#696969]">.</p>
            </span>
            <span className="bg-[#9bff00] w-[156px] h-[25px] rounded-[8px] px-[4px] py-[10px] text-black text-[14px] font-[100] flex items-center justify-center">
              <p>SUBMISSIONS OPEN</p>
            </span>
            <span className="flex items-center justify-center">
              <p className="text-2xl mb-3 text-[#696969]">.</p>
            </span>
            <p className="text-white opacity-75">11:34</p>
          </div>
        </section>
        <section className="px-[112px]">
          <div className="mb-4 overflow-x-auto">
            <div className="flex max-w-[1216px] mx-auto px-4">
              <span className="w-[5%]">#</span>
              <span className="w-[60%]">Title</span>
              <span className="w-[10%]">Author</span>
              <span className="w-[10%] invisible">hidden</span>
              <span className="w-[10%] justify-end">Most Liked</span>
            </div>
            <div>
              {videos?.list?.map((video) => {
                return (
                  <div
                    key={video.id}
                    className="video flex mx-auto mb-4 items-center px-4"
                  >
                    <span className="w-[5%]">{video.user_id}</span>
                    <span className="w-[10%]">
                      <img
                        src={Photo}
                        alt={video.username}
                        className="w-[118px] h-[64px]"
                      />
                    </span>

                    <span className="w-[50%]">{video.title}</span>
                    <span className="text-[#DBFD51] w-[10%]">
                      {video.username}
                    </span>
                    <span className="w-[10%] justify-self-start">
                      {video.like}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => handleClick('prev')}
              className="text-white  bg-[#9bff00] px-8 py-2 rounded-lg"
            >
              Prev
            </button>
            <button
              onClick={() => handleClick('next')}
              className="text-white  bg-[#9bff00] px-8 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;
