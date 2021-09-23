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

    intervalParse: null,

    parse: function(startTimeout) {
        setTimeout(function(){
            urlParamParse.intervalParse = setInterval(function() {
                urlParamParse.executeParse()
            }, 100);
        }, startTimeout);

        setTimeout(function(){
            clearInterval(urlParamParse.intervalParse)
        }, (startTimeout * 5));
    },

    executeParse: () => {
        // parse forms input
        for(let ic = 1; ic <= 5; ic++){ // fix cause JS for some reason lost pattern expression
            document.querySelectorAll('body input').forEach((match) => { 
                if(urlParamParse.regexPattern.test(match.value)){
                    match.value = urlParamParse.paramValue(match.value);
                }
            });
        }
        
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

                            // hack to Vue link
                            if(/(a)/i.test(element.tagName) === true){
                                element.classList.add('overwrite-click');
                                setTimeout(function() {
                                    let linkSpanList = element.getElementsByTagName('span');
                                    for(let sd=0;sd < linkSpanList.length; sd++){
                                        if(linkSpanList.item(idx)){
                                            let linkSpan = linkSpanList.item(idx);
                                            linkSpan.classList.add('overwrite-click');
                                        }
                                    }
                                }, 500);
                            }
                        }
                    }
                }
            }

            if(/(p|span|h1|h2|h3|h4|h5|h6)/i.test(element.tagName) === true){
                if(urlParamParse.regexPattern.test(element.innerHTML)){
                    element.innerHTML = element.innerHTML.replace(urlParamParse.regexPattern, (match) => {
                        let p = urlParamParse.paramValue(match);
                        return p
                    });
                }
            }
        });

        // parse all head elements attributes
        document.querySelectorAll('head *').forEach((element) => { 
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
        });
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