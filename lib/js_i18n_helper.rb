module JsI18nHelper
  def javascript_i18n_include
    javascript_include_tag 'i18n', "locales/#{I18n.locale}"
  end
end
