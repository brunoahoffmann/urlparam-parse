/**
 * Url Param Parse
 * 
 * Example:
 * [urlparam param='src' default='']
 * 
 * @author Bruno A. Hoffmann
 */
var urlParamParse = {
    parse: function() {
        let bodyHtml = document.body;
        document.body.innerHTML = bodyHtml.innerHTML.replace(/\[urlparam [^\]]+\]/ig, (match) => {
            let p = this.paramValue(match);
            return p
        });
    },

    paramValue: (match) => {
        let regexParam   = /.*(param([ =])+["]([^\"]+)?["]|param([ =])+[']([^\']+)?[']).*/ig;
        let regexDefault = /.*(default([ =])+["]([^\"]+)?["]|default([ =])+[']([^\']+)?[']).*/ig;

        let paramValue   = match.replace(regexParam, '$3') || match.replace(regexParam, '$5');
        let paramDefault = match.replace(regexDefault, '$3') || match.replace(regexDefault, '$5');

        paramValue   = (regexParam.test(match))? paramValue: '';
        paramDefault = (regexDefault.test(match))? paramDefault: '';

        if(paramValue.length == 0){
            return '';
        }

        const queryString = window.location.search;
        let urlParams   = new URLSearchParams(queryString);

        return urlParams.has(paramValue)? urlParams.get(paramValue): paramDefault;
    }
}
urlParamParse.parse();