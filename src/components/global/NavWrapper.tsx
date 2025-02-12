import { currentUser } from "@clerk/nextjs";
import Navbar from "./navbar";

const NavbarWrapper = async () => {
    const user = await currentUser(); // Get the user object

    // Convert the user object to a plain JavaScript object
    const userData = user
        ? {
            id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || "",
            firstName: user.firstName,
            lastName: user.lastName,
        }
        : null;

    return <Navbar user={userData} />;
};

export default NavbarWrapper;
