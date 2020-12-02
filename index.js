var postcss = require('postcss');
module.exports = postcss.plugin('postcss-webp-image-prefix', function (options) {
    return css => {
        const prefix = options.prefix || 'webp'
        const suffix = options.suffix || '?x-oss-process=image/format,webp'
        css.walkRules(rule => {
            rule.walkDecls(decl => {
                if (decl.prop === 'background-image') {
                    const s = decl.value.match(/url\(((https|http)\:\/\/(imagetest|image)([\s\S]+?)\.(png|jpg|jpeg))\)/)
                    if (s) {
                        let rew = `.${prefix} ` + rule.selector + '{ background-image: url(' + s[1] + `${suffix}) }`
                        rule.parent.prepend(postcss.parse(rew));
                    }
                }
            })
        })
    }
})