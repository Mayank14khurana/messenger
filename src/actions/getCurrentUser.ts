import prisma from '../utils/prisma';
import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if(!currentUser){
            return null;
        }
        return currentUser;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default getCurrentUser;