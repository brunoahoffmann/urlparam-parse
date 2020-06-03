/**
 * embed using <script>
 */
/**
 * Url Param Parse
 * 
 * Example:
 * [urlparam param='src' default='']
 * 
 * @author Bruno A. Hoffmann
 */
urlParamParse = {
    regexPattern : /\[urlparam[\ ]?[^\]]+\]/ig,
    regexParam   : /.*(param([ =])+["]([^\"]+)?["]|param([ =])+[']([^\']+)?[']).*/ig,
    regexDefault : /.*(default([ =])+["]([^\"]+)?["]|default([ =])+[']([^\']+)?[']).*/ig,

    parse: function(startTimeout) {
        setTimeout(function(){
            // parse forms input
            document.querySelectorAll('body input').forEach((match) => { 
                if(urlParamParse.regexPattern.test(match.value)){
                    match.value = urlParamParse.paramValue(match.value);
                }
            });
            
            // parse all html elements attributes
            document.querySelectorAll('body *').forEach((element) => { 
                if(/(script|input)/i.test(element.tagName) === false){
                    for(let idx=0;idx < element.attributes.length; idx++){
                        if(element.attributes.item(idx)){
                            let attr = element.attributes.item(idx).name;
                            if(urlParamParse.regexPattern.test(element.getAttribute(attr))){
                                let valueParsed = element.getAttribute(attr).replace(urlParamParse.regexPattern, (match) => {
                                    let p = urlParamParse.paramValue(match);
                                    return p
                                });
                                element.setAttribute(attr, valueParsed);
                            }
                        }
                    }
                }

                if(/(p|span|h1|h2|h3|h4|h5|h6)/i.test(element.tagName) === true){
                    element.innerHTML = element.innerHTML.replace(urlParamParse.regexPattern, (match) => {
                        let p = urlParamParse.paramValue(match);
                        return p
                    });
                }
            });
        }, startTimeout);
    },

    paramValue: (match) => {
        let regexParam   = urlParamParse.regexParam;
        let regexDefault = urlParamParse.regexDefault;

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
};
urlParamParse.parse((document.currentScript.getAttribute('timeout') || 100));