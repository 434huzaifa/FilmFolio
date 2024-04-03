import { Avatar, Button, Popover } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
const MyNavbar = () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate=useNavigate()
    function handelLogout() {
        localStorage.removeItem("user")
        navigate("/login")
    }
  const popoverContent = (
    <div className="font-roboto-slab">
      <p className="text-lg font-bold">{user?.name}</p>
      <p>{user?.email}</p>
      <Button
        size="small"
        onClick={handelLogout}
        className="w-full bg-red-200 text-red-800 font-semibold"
      >
        {" "}
        Logout
      </Button>
    </div>
  );
  return (
    <div className="flex justify-between border-b pb-2 pr-10 mb-2">
      <Link to="/">
      <div className="flex gap-2 items-center">
        <img src="/star.png" alt="" className="size-6" />
        <p className="font-bold text-xl font-roboto-slab">FilmFolio</p>
      </div>
      </Link>
      <div>
        <div className="flex gap-2">
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
      <div>
      <Popover content={popoverContent} trigger="click">
        <Avatar icon={<IoPersonSharp />}></Avatar>
        </Popover>
      </div>
    </div>
  );
};

export default MyNavbar;
