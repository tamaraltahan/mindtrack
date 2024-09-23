import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const UserMenu = ({ authToken, setUser, auth }) => {
  useEffect(() => {
    console.log("UserMenu component setUser:", typeof setUser);
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(typeof setUser);

  return (
    <div className="AuthContainerCenter">
      <div className="containerRight">
        <Dropdown>
          <DropdownTrigger>
            {authToken && authToken.photoURL ? (
              <Image
                width={60}
                height={60}
                css={{ borderRadius: 20 }}
                referrerPolicy="no-referrer"
                src={authToken.photoURL}
                alt="user profile"
                className="cursor-pointer"
              />
            ) : (
              <div>
                <p>No Image Available</p>
              </div>
            )}
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={logout} className="text-warning-400">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserMenu;
