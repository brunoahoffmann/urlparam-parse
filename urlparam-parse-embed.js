/**
 * embed using <script>
 */

import urlParamParse from './src/urlparam-parse.js';
urlParamParse.parse((document.currentScript.getAttribute('timeout') || 100));