class JsLocalesGenerator < Rails::Generator::NamedBase
  attr_reader :locales
  LOCALES_DIR = 'public/javascripts/locales'.freeze
  
  def initialize(runtime_args, runtime_options = {})
    super
    @locales = runtime_args
  end

  def manifest
    record do |m|
      m.file 'i18n.js', "public/javascripts/i18n.js"

      m.directory LOCALES_DIR
      @locales.each do |locale|
        m.template 'locale_template.js', File.join(LOCALES_DIR, "#{locale}.js"), :assigns => { :locale => locale }
      end
    end
  end
end
