import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/conversations/Body";
import Form from "@/components/conversations/Form";
import Header from "@/components/conversations/Header";
import EmptyState from "@/components/EmptyState";

interface Params{
    conversationId:string
}
const ConversationId = async ({ params }: { params: Params }) => {
    const id =(await params).conversationId;
  const conversation = await getConversationById(id);
  const messages = await getMessages(id);
    if(!conversation){
        return (
            <div className="lg:pl-80 h-full">
             <div className="h-full flex flex-col">
               <EmptyState />
             </div>
            </div>
        )
    }
    return(
        <div className="lg:pl-80 h-full">
             <div className="h-full flex flex-col ">
               <Header conversation={conversation} />
               <Body initialMessages={messages} />
               <Form />
             </div>
        </div>
    )

}
export default ConversationId;