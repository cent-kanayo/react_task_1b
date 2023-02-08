import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../authContext';
import { GlobalContext, showToast } from '../globalContext';
import MkdSDK from '../utils/MkdSDK';

import drop from '../images/dropdown.png';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Table from '../components/Table';

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: global } = React.useContext(GlobalContext);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  const [row, setRow] = useState([]);

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

  if (!videos?.list?.length) return <h1>Loading...</h1>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#111111] w-full pt-3 ">
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
        <section>
          <div>
            <div className="flex max-w-[1216px] items-center mx-auto px-4 text-white opacity-30 mb-3 relative">
              <span className="w-[4%]">#</span>
              <span className="w-[48%]">Title</span>
              <span className="w-[53%]">Author</span>
              <span className="w-[10%] invisible">hidden</span>
              <span className="flex items-center space-x-1 absolute right-4">
                <span>Most Liked</span>
                <span>
                  <img
                    src={drop}
                    alt="drop down icon"
                    className="opacity-100"
                  />
                </span>
              </span>
            </div>
            <Table videos={videos} />
          </div>
          <div className="flex justify-between items-center mb-8  max-w-[1216px] mx-auto">
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
    </DndProvider>
  );
};

export default AdminDashboardPage;
