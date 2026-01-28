import { Router } from 'express';
const router = Router();
import { roleRoute } from '../modules/role/roleRoute';
import { userRoute } from '../modules/user/userRoute';
import { authRoute } from '../modules/auth/authRoute';

import { seoRoute } from '../modules/seo/seoRoute';
import { bannerRoute } from '../modules/banner/bannerRoute';
import { contactRoute } from '../modules/contact/contactRoute';
import { popupNoticeRoute } from '../modules/popupNotification/popupNoticeRoute';
import { blogRoute } from '../modules/blog/blogRoute';
import { generalSettingRoute } from '../modules/generalSetting/generalSettingRoute';
import { gtmRoute } from '../modules/gtm/gtmRoute';
import { aboutRoute } from '../modules/about/aboutRoute';
import { messagesRoute } from '../modules/message/messageRoute';
import { managementRoute } from '../modules/management/managementRoute';
import { teamRoute } from '../modules/team/teamRoute';
import { moreAboutRoute } from '../modules/moreAbout/moreAboutRoute';
import { projectTypesRoute } from '../modules/projectType/projectTypeRoute';
import { projectRoute } from '../modules/project/projectRoute';
import { teamCategoryRoute } from '../modules/teamCategory/teamCategoryRoute';
import { concernsRoute } from '../modules/concerns/concernsRoute';
import { awardsRoute } from '../modules/awards/awardsRoute';
import { appointmentRoute } from '../modules/appointment/appointmentRoute';
import { concernProductRoute } from '../modules/concernProduct/concernProductRoute';
import { chairmanQuoteRoute } from '../modules/media/chairmanQuote/chairmanQuoteRoute';
import { pressReleaseRoute } from '../modules/media/pressRelease/pressReleaseRoute';
import { tvNewsRoute } from '../modules/media/tvNews/tvNewsRoute';
import { newsRoute } from '../modules/media/news/newsRoute';

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
    permissionRoute: false,
  },
  {
    path: '/user',
    route: userRoute,
    permissionRoute: true,
  },
  {
    path: '/role',
    route: roleRoute,
    permissionRoute: true,
  },

  // project route
  {
    path: '/project-type',
    route: projectTypesRoute,
    permissionRoute: true,
  },
  {
    path: '/project',
    route: projectRoute,
    permissionRoute: true,
  },

  // frontend setting
  {
    path: '/about',
    route: aboutRoute,
    permissionRoute: true,
  },
  {
    path: '/more-about',
    route: moreAboutRoute,
    permissionRoute: true,
  },
  {
    path: '/concerns',
    route: concernsRoute,
    permissionRoute: true,
  },
  {
    path: '/concern-product',
    route: concernProductRoute,
    permissionRoute: true,
  },
  {
    path: '/management',
    route: managementRoute,
    permissionRoute: true,
  },
  {
    path: '/team-category',
    route: teamCategoryRoute,
    permissionRoute: true,
  },
  {
    path: '/team',
    route: teamRoute,
    permissionRoute: true,
  },
  // media routes
  {
    path: '/chairman-quote',
    route: chairmanQuoteRoute,
    permissionRoute: true,
  },
  {
    path: '/news',
    route: newsRoute,
    permissionRoute: true,
  },
  // awards routes
  {
    path: '/awards',
    route: awardsRoute,
    permissionRoute: true,
  },
  {
    path: '/contact',
    route: contactRoute,
    permissionRoute: true,
  },
  {
    path: '/message',
    route: messagesRoute,
    permissionRoute: true,
  },
  {
    path: '/appointment',
    route: appointmentRoute,
    permissionRoute: true,
  },
  {
    path: '/blogs',
    route: blogRoute,
    permissionRoute: true,
  },

  // banner
  {
    path: '/banner',
    route: bannerRoute,
    permissionRoute: true,
  },

  // popup notice
  {
    path: '/notice',
    route: popupNoticeRoute,
    permissionRoute: true,
  },

  // general setting
  {
    path: '/general-setting',
    route: generalSettingRoute,
    permissionRoute: true,
  },
  {
    path: '/gtm',
    route: gtmRoute,
    permissionRoute: true,
  },
  {
    path: '/seo',
    route: seoRoute,
    permissionRoute: true,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.get('/permission-routes/all', (req, res) => {
  const routes = moduleRoutes
    .filter((route) => route.permissionRoute)
    .map((route) => route.path.replace('/', ''));

  res.json({
    success: true,
    message: 'All routes get success',
    data: routes,
  });
});

export default router;
