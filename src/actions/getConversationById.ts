import getCurrentUser from "./getCurrentUser";
import prisma from '../utils/prisma';
const getConversationById = async (conversationId: string) => {
    try {
     const user =await getCurrentUser();
     if(!user?.email){
        return null;
     }
     const conversation =await prisma.conversation.findUnique({
        where:{
            id:conversationId
        },
         include:{
            users:true
         }
     })
     return conversation;
    } catch (err) {
        console.log(err);
        return null;
    }
}
export default getConversationById;