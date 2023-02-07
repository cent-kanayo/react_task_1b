import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../authContext';
import { GlobalContext, showToast } from '../globalContext';

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: global, videos } = React.useContext(GlobalContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/admin/login');
    showToast(global, 'Logout successful!');
  };
  return (
    <>
      <div className="bg-[#111111] w-full ">
        <header className="flex justify-between items-center mb-[71px]">
          <h3 className="text-white font-extrabold text-[48px]">App</h3>
          <button
            onClick={handleLogout}
            className="block w-[128px] h-[48px] bg-[#9BFF00] rounded-[40px] text-[#050505]"
          >
            Logout
          </button>
        </header>
        <section className="flex justify-between items-center">
          <div>
            <h4 className="text-white font-[100] text-[40px]">
              Today’s leaderboard
            </h4>
          </div>
          <div className="bg-[#1D1D1D] w-[418px] h-[56px] rounded-[16px] flex items-center justify-between px-[24px] py-[18px]">
            <p className="font-normal text-[16px] text-white">
              {new Date().toDateString()}
            </p>
            <p>.</p>
            <span className="bg-[#9bff00] w-[156px] h-[25px] rounded-[8px] px-[4px] py-[10px] text-black text-[14px] font-[100] flex items-center justify-center">
              <p>SUBMISSIONS OPEN</p>
            </span>
            <p>.</p>
            <p className="text-white">11:34</p>
          </div>
        </section>
        <section>
          <table width="full">
            <thead>
              <tr className="text-white bg-slate-600">
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Most Liked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default AdminDashboardPage;
