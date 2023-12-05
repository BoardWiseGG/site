defmodule BoardWiseWeb.LanguageController do
  use BoardWiseWeb, :controller

  alias BoardWise.Languages

  def index(conn, _params) do
    langs = Languages.list_languages()
    render(conn, :index, langs: langs)
  end
end
