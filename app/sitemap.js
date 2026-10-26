import { SITE_URL, projects, routes } from '@/content/index';

export const dynamic = 'force-static';

const url = (path) => `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: url(routes.home), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: url(routes.projects), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((entry) => ({
      url: url(routes.project(entry.slug)),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
    { url: url(routes.about), lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: url(routes.contact), lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
