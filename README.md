## urlparam-parse
- Parse URL params and change your HTML code using a simple pattern.
<h3>Url Param Parse - Examples</h3>

        [urlparam param='src' default=''] - url param 'src' width default blank
        [urlparam param='tag' default='ABC'] - url param 'tag' with default 'ABC'
        [urlparam param='redir'] - url param 'redir' without default defined

        <form action="http://url_form/?src=[urlparam param='src' default='']"> - url param 'src' into form action URL

        <input type="text" value="[urlparam param='src' default='']" /> - url param 'src' into input text

        <a href="http://url_link/?src=[urlparam param='src' default='']"> - url param 'src' into link href 

        - setting timeout when embed script
        <script src="urlparam-parse.js" timeout="1000"></script>