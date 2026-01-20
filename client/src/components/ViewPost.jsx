/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  SmilePlus,
  Copy,
  Loader2,
  X,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import authorImage from "../assets/author-image.jpeg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";

export default function ViewPost() {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const [shareCount, setShareCount] = useState(0);

  const param = useParams();
  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state.user;

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const postUrl = `${import.meta.env.VITE_API_URL}/posts/${param.postId}`;
      console.log("Fetching post from URL:", postUrl);
      const postsResponse = await axios.get(postUrl);
      setImg(postsResponse.data.image);
      setTitle(postsResponse.data.title);
      setDate(postsResponse.data.date);
      setDescription(postsResponse.data.description);
      setCategory(postsResponse.data.category);
      setContent(postsResponse.data.content);

      // Get author info
      if (postsResponse.data.user_id) {
        try {
          const authorResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile/${postsResponse.data.user_id}`
          );
          setAuthor(authorResponse.data);
        } catch (authorError) {
          console.log("Could not fetch author info:", authorError);
          // Set default author if fetch fails
          setAuthor(null);
        }
      }

      const likesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
      );
      setLikes(likesResponse.data.like_count);
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`
      );
      setComments(commentsResponse.data);

      // Get share count from localStorage
      const shares = JSON.parse(localStorage.getItem('shareCount') || '{}');
      setShareCount(shares[param.postId] || 0);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigate("*");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
      <div className="space-y-4 md:px-4">
        <img
          src={img}
          alt={title}
          className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px]"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8">
          <article className="px-4">
            <div className="flex">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {category}
              </span>
              <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-4 mb-10">{description}</p>
            <div className="markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden px-4">
            <AuthorBio author={author} />
          </div>

          <Share
            likesAmount={likes}
            setDialogState={setIsDialogOpen}
            user={user}
            setLikes={setLikes}
            shareCount={shareCount}
            setShareCount={setShareCount}
          />
          <Comment
            setDialogState={setIsDialogOpen}
            commentList={comments}
            user={user}
            setComments={setComments}
          />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio author={author} />
          </div>
        </div>
      </div>
      <CreateAccountModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
      />
    </div>
  );
}

function Share({ likesAmount, setDialogState, user, setLikes, shareCount, setShareCount }) {
  const shareLink = encodeURI(window.location.href);
  const shareTitle = encodeURIComponent(document.title);
  const param = useParams();
  const [isLiking, setIsLiking] = useState(false);

  const handleShare = () => {
    // Increment share count
    const shares = JSON.parse(localStorage.getItem('shareCount') || '{}');
    shares[param.postId] = (shares[param.postId] || 0) + 1;
    localStorage.setItem('shareCount', JSON.stringify(shares));
    setShareCount(shares[param.postId]);
  };

  const handleLikeClick = async () => {
    if (!user) {
      return setDialogState(true);
    }

    setIsLiking(true);
    try {
      // First try to like the post
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
        );
      } catch (error) {
        // If we get a 500 error, assume the post is already liked and try to unlike
        if (error.response?.status === 500) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
          );
        } else {
          // If it's a different error, throw it to be caught by the outer try-catch
          throw error;
        }
      }

      // After either liking or unliking, get the updated like count
      const likesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
      );
      setLikes(likesResponse.data.like_count);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <div className="px-4 md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:py-6 md:px-6 md:rounded-sm flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:justify-between mb-10">
        <button
          onClick={handleLikeClick}
          disabled={isLiking}
          className={`flex items-center justify-center space-x-2 px-8 sm:px-11 py-3 rounded-full text-foreground border border-foreground transition-colors group ${isLiking
            ? "bg-gray-200 cursor-not-allowed text-gray-500 border-gray-300"
            : "bg-white hover:border-muted-foreground hover:text-muted-foreground"
            }`}
        >
          <SmilePlus className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-foreground group-hover:text-muted-foreground font-medium transition-colors">
            {likesAmount}
          </span>
        </button>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              handleShare();
              toast.custom((t) => (
                <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="bg-white flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group"
          >
            <Copy className="w-5 h-5 text-foreground transition-colors group-hover:text-muted-foreground" />
            <span className="text-foreground font-medium transition-colors group-hover:text-muted-foreground">
              Copy
            </span>
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaFacebook className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareLink}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaXTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://www.instagram.com/direct/new/?text=${shareTitle}%20${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          {shareCount > 0 && (
            <span className="text-xs sm:text-sm text-muted-foreground w-full text-center lg:w-auto lg:ml-2 mt-2 lg:mt-0">
              Shared {shareCount} {shareCount === 1 ? 'time' : 'times'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Comment({ setDialogState, commentList, setComments, user }) {
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const param = useParams();

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setIsError(true);
    } else {
      // Submit the comment
      setIsError(false);
      const textToSend = replyTo
        ? `@${replyTo.name} ${commentText}`
        : commentText;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`,
        {
          comment: textToSend,
        }
      );
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`
      );
      setComments(commentsResponse.data);
      setCommentText("");
      setReplyTo(null);
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Comment Posted!</h2>
            <p className="text-sm">
              Your comment has been successfully added to this post.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  const handleReply = (comment) => {
    if (!user) {
      setDialogState(true);
      return;
    }
    setReplyTo(comment);
    // Scroll to comment box
    document.querySelector('textarea[placeholder="What are your thoughts?"]')?.focus();
  };

  return (
    <div>
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-lg font-semibold">Comment</h3>
        {replyTo && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-100 p-2 rounded">
            <span>Replying to <strong>{replyTo.name}</strong></span>
            <button
              onClick={() => setReplyTo(null)}
              className="ml-auto text-foreground hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <form className="space-y-2 relative" onSubmit={handleSendComment}>
          <Textarea
            value={commentText}
            onFocus={() => {
              setIsError(false);
              if (!user) {
                return setDialogState(true);
              }
            }}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="What are your thoughts?"
            className={`w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${isError ? "border-red-500" : ""
              }`}
          />
          {isError && (
            <p className="text-red-500 text-sm absolute">
              Please type something before sending.
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6 px-4">
        {commentList.map((comment, index) => (
          <CommentItem
            key={index}
            comment={comment}
            index={index}
            commentList={commentList}
            user={user}
            onReply={handleReply}
            setDialogState={setDialogState}
          />
        ))}
      </div>
    </div>
  );
}

function CommentItem({ comment, index, commentList, user, onReply, setDialogState }) {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!user) {
      setDialogState(true);
      return;
    }
    navigate(`/messages?userId=${comment.user_id}`);
  };

  // Don't show message button if it's the current user
  const isCurrentUser = user?.id === comment.user_id;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">
          <img
            src={comment.profile_pic}
            alt={comment.name}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-col items-start justify-between">
            <div className="relative">
              <h4
                className="font-semibold cursor-pointer hover:underline text-sm sm:text-base"
                onMouseEnter={() => setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
              >
                {comment.name}
              </h4>
              {showCard && !isCurrentUser && (
                <div
                  className="absolute left-0 top-full mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64"
                  onMouseEnter={() => setShowCard(true)}
                  onMouseLeave={() => setShowCard(false)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={comment.profile_pic}
                      alt={comment.name}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <h5 className="font-bold">{comment.name}</h5>
                      <p className="text-sm text-gray-500">@{comment.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="w-full px-4 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors text-sm"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              {new Date(comment.created_at)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(", ", " at ")}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm sm:text-base ml-13 sm:ml-16 break-words">{comment.comment_text}</p>
      {user && (
        <button
          onClick={() => onReply(comment)}
          className="text-xs sm:text-sm text-muted-foreground hover:text-foreground ml-13 sm:ml-16 text-left font-medium"
        >
          Reply
        </button>
      )}
      {index < commentList.length - 1 && (
        <hr className="border-gray-300 my-4" />
      )}
    </div>
  );
}

function AuthorBio({ author }) {
  if (!author) {
    return (
      <div className="bg-[#EFEEEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 bg-gray-300 animate-pulse" />
          <div className="flex-1">
            <div className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse mb-2 w-16 sm:w-20" />
            <div className="h-5 sm:h-6 bg-gray-300 rounded animate-pulse w-24 sm:w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EFEEEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
          <img
            src={author.profile_pic || authorImage}
            alt={author.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm">Author</p>
          <h3 className="text-lg sm:text-2xl font-bold truncate">{author.name}</h3>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="text-muted-foreground space-y-3 sm:space-y-4 text-sm sm:text-base">
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <>
            <p>
              I am a pet enthusiast and freelance writer who specializes in animal
              behavior and care. With a deep love for cats, I enjoy sharing insights
              on feline companionship and wellness.
            </p>
            <p>
              When I&apos;m not writing, I spend time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function CreateAccountModal({ dialogState, setDialogState }) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg w-52"
        >
          Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-muted-foreground">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
          >
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
