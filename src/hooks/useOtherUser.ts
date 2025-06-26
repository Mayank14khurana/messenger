import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
const useOtheruser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession();
    const otherUser = useMemo(() => {
        const currentuserEmail = session.data?.user?.email;
        const otherUser = conversation.users.filter((user) => user.email != currentuserEmail);
        return otherUser;
    }, [session.data?.user?.email, conversation.users])
    return otherUser[0];
}
export default useOtheruser;