var I18n = function() {
  var self = this;
  var translations = null;
  var locale = null;

  this.lookup = function(key) {
    return getTranslations()[key];
  };

  this.getLocale = function() {
    if( locale == null ) {
      locale = lookup('locale') || 'en';
    }
    return locale;
  };

  var getTranslations = function() {
    if( translations == null ) {
      translations = unifyTranslations(Translations);
    }
    return translations;
  };

  // merge all nested objects into one layer hash with
  // keys separated by dots, e.g. "foo.bar.baz"
  var unifyTranslations = function(hash, key_prefix) {
    var key_prefix = key_prefix || "";
    if( key_prefix.length != 0) {
      key_prefix += ".";
    }

    var result = {};
    for(var key in hash) {
      var value = hash[key];
      if( typeof value == "object" ) {
        var result_for_key = unifyTranslations(value, key_prefix + key);
        for(key in result_for_key) {
          result[key] = result_for_key[key];
        }
      } else {
        result[key_prefix + key] = value;
      }
    }
    return result;
  };

  return {
    t: function(key, options) {
      var value = self.lookup(key);
      if( value == null ) return "Translation for [" + key + "] key not found" ;

      if(options != null) {
        for(key in options) {
          value = value.replace("{{" + key + "}}", options[key]);
        }
      }
      return value;
    },

    locale: function() {
      return self.getLocale();
    }
  };
}();
