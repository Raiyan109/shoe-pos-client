import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import { MdCategory } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import Categories from "../pages/Main/Categories/Categories";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "Categories",
    path: "categories",
    icon: MdCategory,
    element: <Categories />,
  },
  {
    name: "Brands",
    path: "brands",
    icon: SlBadge,
    element: <Categories />,
  },

  // {
  //   name: "Approve Request",
  //   rootPath: "approveRequest",
  //   icon: GrMoney,
  //   children: [
  //     {
  //       name: "Studio Post",
  //       path: "approveRequest/all-earnings",
  //       icon: LuWallet,
  //       element: <StudioPost />,
  //     },
  //     {
  //       name: "Trainer Post",
  //       path: "approveRequest/withdraw",
  //       icon: PiHandWithdrawBold,
  //       element: <TrainerPost />,
  //     },
  //   ],
  // },
  // {
  //   path: "notifications",
  //   element: <Notifications />,
  // },
  // {
  //   path: "add-subscription",
  //   element: <AddSubscription />,
  // },
  // {
  //   path: "edit-subscription",
  //   element: <EditSubscription />,
  // },
  // {
  //   path: "add-meal",
  //   element: <AddMeal />,
  // },
  // {
  //   path: "edit-meal/:mealId",
  //   element: <EditMeal />,
  // },
  // {
  //   path: "add-exercise",
  //   element: <AddExercise />,
  // },
  // {
  //   path: "edit-exercise/:exerciseId",
  //   element: <EditExercise />,
  // },
  // {
  //   path: "add-workout-plan",
  //   element: <AddWorkoutPlan />,
  // },
  // {
  //   path: "edit-workout-plan/:workoutPlanId",
  //   element: <EditWorkoutPlan />,
  // },
  // {
  //   path: "add-workout",
  //   element: <AddWorkout />,
  // },
  // {
  //   path: "edit-workout/:workoutId",
  //   element: <EditWorkout />,
  // },
  // {
  //   path: "add-workout-video",
  //   element: <AddWorkoutVideoNormal />,
  //   // element: <AddWorkoutVideo />,
  // },
  // {
  //   path: "edit-workout-video/:workoutId",
  //   element: <EditWorkoutVideo />,
  // },
  // {
  //   path: "add-badge",
  //   element: <AddBadge />,
  // },
  // {
  //   path: "edit-badge/:badgeId",
  //   element: <EditBadge />,
  // },



  // {
  //   name: "Settings",
  //   path: "settings",
  //   icon: IoSettingsOutline,
  //   element: <Setting />,
  // },
  // {
  //   path: "/hosts/:id",
  //   element: <HostDetails />,
  // },
  // {
  //   name: "Settings",
  //   rootPath: "settings",
  //   icon: CiSettings,
  //   children: [
  //     {
  //       name: "Personal Information",
  //       path: "settings/profile",
  //       icon: CiUser,
  //       element: <MyProfile />,
  //     },
  //     {
  //       path: "settings/profile/edit",
  //       element: <EditMyProfile />,
  //     },
  //     {
  //       name: "Change Password",
  //       icon: FaServicestack,
  //       path: "settings/change-password",
  //       element: <ChangePassword />,
  //     },
  //     {
  //       path: "settings/change-password/forgot-password",
  //       element: <ForgotPassword />,
  //     },
  //     {
  //       path: "settings/change-password/forgot-password/verify-email",
  //       element: <VerifyEmail />,
  //     },
  //     {
  //       path: "settings/change-password/forgot-password/reset-password",
  //       element: <ResetPassword />,
  //     },
  //     {
  //       name: "Terms & Condition",
  //       icon: FaServicestack,
  //       path: "settings/terms-conditions",
  //       element: <TermsConditions />,
  //     },
  //     {
  //       path: "settings/terms-conditions/edit",
  //       element: <EditTermsConditions />,
  //     },
  //     {
  //       name: "Privacy Policy",
  //       icon: MdOutlineSecurityUpdateWarning,
  //       path: "settings/privacy-policy",
  //       element: <PrivacyPolicy />,
  //     },
  //     {
  //       path: "settings/privacy-policy/edit",
  //       element: <EditPrivacyPolicy />,
  //     },
  //     {
  //       name: "About Us",
  //       icon: BiMessageSquareDetail,
  //       path: "settings/about-us",
  //       element: <Trust />,
  //     },
  //     {
  //       path: "settings/about-us/edit",
  //       element: <EditTrust />,
  //     },
  //   ],
  // },
];
