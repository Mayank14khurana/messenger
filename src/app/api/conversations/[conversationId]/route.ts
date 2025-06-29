import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../../utils/prisma';
interface Params {
  conversationId?: string
}
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 });
    }
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });
    if (!conversation) {
      return new NextResponse('Invalid Id', { status: 400 });
    }
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    });
    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 })
  }
}