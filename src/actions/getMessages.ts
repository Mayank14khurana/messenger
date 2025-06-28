import prisma from '../utils/prisma';

const getMessages= async (conversationId:string)=>{
    try{
       const messages =await prisma.message.findMany({
        where:{
          conversationId
        } ,
        orderBy:{
            createdAt:'asc'
        },
        include:{
          sender:true,
          seen:true
        }
       })
       return messages;
    }catch(err){
        console.log(err);
        return [];
    }
}
export default getMessages;