import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!(userInfo as { onboarded?: boolean })?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(params.id);
  
  return (<section className="relative">
    <div>
      <ThreadCard
        id={thread._id}
        currentUserId={user?.id || ""}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        createdAt={thread.createdAt}
        comments={thread.children} community={null}      />
    </div>

    <div className="mt-7">
      <Comment
        threadId={thread.id}
        currentUserImg={user.imageUrl}
        currentUserId={userInfo ? JSON.stringify((userInfo as { _id: unknown })._id) : ""}
      />
    </div>
  </section>);
  }

export default Page;
