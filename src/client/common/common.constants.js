export const BLOG = { id: 'blog', name: 'Blog', url: 'blog' };
export const CAREER = { id: 'career', name: 'Career', url: 'career' };
export const LOGIN = { id: 'login', name: 'Login', url: 'login' };
export const MAIN = { id: 'main', name: 'Main', url: '' };

/**
 * Pages settings
 */
export const PAGES = [MAIN, BLOG, CAREER, LOGIN];

export const API_PATH = process.env.REACT_APP_API_PATH || '/api';

export const MSG = {
  AUTH_FAILED: 'Authorization failed',
};
