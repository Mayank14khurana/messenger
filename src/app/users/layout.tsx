
import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserList from "@/components/User/userList";
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const users =await getUsers();
    return (
        <Sidebar>
            <div className="h-full">
                
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}