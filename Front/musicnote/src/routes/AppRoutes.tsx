import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Analysis from "../pages/analysis/Analysis";
import ReportDaily from "../pages/analysis/ReportDaily";
import ReportWeekly from "../pages/analysis/ReportWeekly";
import Discover from "../pages/discover/Discover";
import ChoiceMusicAnalysis from "../pages/discover/ChoiceMusicAnalysis";
import ChoiceMusicReports from "../pages/discover/ChoiceMusicReports";
import ChoiceMusicReportDetail from "../pages/discover/ChoiceMusicReportDetail";
import ChoiceMusiclist from "../pages/discover/ChoiceMusiclist";
import LineChart from "../pages/discover/LineChart";
import Recommendations from "../pages/recommend/Recommendations";
import Login from "../pages/Login";
import MusicList from "../pages/MusicList";
import MyRecommendation from "../pages/recommend/MyRecommendation";
import NotFound from "../components/NotFound";
import Notification from "../pages/Notification";
import RecommendationMovie from "../pages/recommend/RecommendationMovie";
import RecommendationMusic from "../pages/recommend/RecommendationMusic";
import RecommendationBook from "../pages/recommend/RecommendationBook";
import MyRecommendationMovie from "../pages/recommend/MyRecommendationMovie";
import MyRecommendationMusic from "../pages/recommend/MyRecommendationMusic";
import MyRecommendationBook from "../pages/recommend/MyRecommendationBook";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes(): React.ReactElement {
  return (
    <Routes>
      {/* 인증이 필요없는 라우트 */}
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Login />} />

      {/* 인증이 필요한 라우트 */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/musiclist/:reportId" element={<MusicList />} />
        <Route path="/choice-musiclist/:reportId" element={<ChoiceMusiclist />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/report/daily/:reportId" element={<ReportDaily />} />
        <Route path="/analysis/report/weekly/:reportId" element={<ReportWeekly />} />
        <Route path="/analysis/report/choice/:reportId" element={<ChoiceMusicReportDetail />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/choice-music-analysis" element={<ChoiceMusicAnalysis />} />
        <Route path="/discover/choice-music-analysis/reports" element={<ChoiceMusicReports />} />
        <Route path="/discover/line-chart" element={<LineChart />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/recommendations/detail/movie" element={<RecommendationMovie />} />
        <Route path="/recommendations/detail/music" element={<RecommendationMusic />} />
        <Route path="/recommendations/detail/book" element={<RecommendationBook />} />
        <Route path="/recommendations/my" element={<MyRecommendation />} />
        <Route path="/recommendations/my/movie" element={<MyRecommendationMovie />} />
        <Route path="/recommendations/my/music" element={<MyRecommendationMusic />} />
        <Route path="/recommendations/my/book" element={<MyRecommendationBook />} />
        <Route path="/notification" element={<Notification />} />
      </Route>

      {/* 404 페이지 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
