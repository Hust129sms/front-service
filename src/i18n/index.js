import { englishMessages } from 'admin-on-rest';
import chineseMessages from '../aor-language-chinese';

import customEnglishMessages from './en';
import customChineseMessages from './ch';

export default {
    ch: { ...chineseMessages, ...customChineseMessages },
    en: { ...englishMessages, ...customEnglishMessages },

};
