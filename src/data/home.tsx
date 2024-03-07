import CoursePage from "src/pages/CoursePage/CoursePage";
import Blog from "src/pages/MainPage/BlogPage/Blog";
import HomePage from "src/pages/MainPage/HomePage/HomePage";
import { IComponent } from "src/types/component";

export const homePageElements: IComponent[] = [
  { id: "", component: <HomePage /> },
  { id: "course", component: <CoursePage /> },
  { id: "blog",component:<Blog /> },
];

