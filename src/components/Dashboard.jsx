import React, { useEffect, useState } from "react";
import { getUserDataByID } from "../api/user";

const Dashboard = () => {
  const [userID, setUserID] = useState("");
  const [userGuides, setUserGuides] = useState([]);
  const user = JSON.parse(localStorage.getItem("username"));
  const cookieString = document.cookie;
  const cookies = {};
  const cookieArray = cookieString.split(";");

  function getUserId(cookiesArray) {
    const userIdCookie = cookiesArray.find((cookie) =>
      cookie.startsWith(" USER_ID=")
    );

    if (userIdCookie) {
      const userId = userIdCookie.split("=")[1];
      setUserID(userId);
    }
  }

  useEffect(() => {
    getUserId(cookieArray);
  }, []);

  return (
    <div className="w-full flex justify-center px-2 text-slate-200 slide-in-effect mt-5">
      <div className="flex flex-col mx-3 fade-in-effect max-w-[800px] min-h-[700px] border-b-[1px] border-orange-600">
        <div className="flex text-sm xs:text-base mt-[0rem] border-b-[1px] pb-2 border-slate-500">
          ~/&nbsp;Dashboard&nbsp;/&nbsp;{" "}
          <p className="text-orange-400">{user}</p>&nbsp;/&nbsp;Guides
        </div>
        {!userGuides.length ? (
          <div className="flex flex-col p-2 justify-center text-sm text-slate-400">
            <p>
              This is where you will edit all your unpublished Guides. Once
              published, you will have to unpublish in order to edit again. Once
              published, the guide will be sent to a developer to approve, then
              the guide will be available to all users. Any personal guides can
              be unpublished and deleted at any time.
            </p>
            <div className="flex mt-[2rem] justify-center">
              <p className="mt-[3px] mr-2">Create your first guide here:</p>
              <button className="bg-orange-600 text-white px-2 py-1 rounded-sm">
                Create Guide
              </button>
            </div>
          </div>
        ) : null}
        <div className="flex mt-[3rem] text-sm xs:text-base border-b-[1px] pb-2 border-slate-500">
          ~/&nbsp;Dashboard&nbsp;/&nbsp;
          <p className="text-orange-400">{user}</p>
          &nbsp;/&nbsp;BookmarkedGuides
        </div>
        <div className="flex p-2 justify-center text-sm text-slate-400">
          <p className="mt-5">Feature Coming soon.</p>
        </div>
        <div className="flex mt-[3rem] text-sm xs:text-base border-b-[1px] pb-2 border-slate-500">
          ~/&nbsp;Dashboard /&nbsp;RecentlyPosted
        </div>
        <div className="flex p-2 justify-center text-sm text-slate-400">
          <p className="mt-5">Feature Coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// User Profile Overview:
// Display a snapshot of the user's profile, including their username, profile picture, and a brief bio. Allow users to update their profile information directly from the dashboard.

// Guide Overview:
// As you currently have, display a list of guides the user has created. Include key details like guide titles, publication date, and status (e.g., draft, published). Implement sorting and filtering options for better organization.

// Recent Activity Feed:
// Showcase a feed of the user's recent activities, such as guide creations, comments, or interactions with other users. This provides a dynamic and real-time view of their engagement on the platform.

// Notification Center:
// Implement a notification center to alert users about relevant updates, comments on their guides, or new followers. Notifications enhance user engagement and keep them informed about platform activities.

// Achievements and Badges:
// Recognize and reward users for their accomplishments. Implement an achievement system or badges based on guide creation milestones, community participation, or other notable achievements.

// Progress Tracking:
// For guides in progress, incorporate a progress tracker to help users visualize their completion status. This feature can include a percentage completion bar or checklist of steps to finish a guide.

// User Analytics:
// Provide users with analytics related to their guides, such as views, likes, and comments. Analytics can help users understand the impact of their content and guide them in improving their contributions.

// Recommended Guides:
// Utilize an algorithm to suggest guides that align with the user's interests and expertise. This feature encourages exploration and discovery within the platform.

// Community Insights:
// Offer insights into the broader community, such as popular guides, trending topics, or featured contributors. This keeps users engaged with the larger platform ecosystem.

// Settings and Preferences:
// Allow users to manage their account settings and preferences directly from the dashboard. This includes privacy settings, notification preferences, and account security options.

// Feedback and Support:
// Provide a channel for users to submit feedback, report issues, or seek assistance. A user-friendly support system enhances the overall user experience.
