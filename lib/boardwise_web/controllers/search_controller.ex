defmodule BoardWiseWeb.SearchController do
  use BoardWiseWeb, :controller

  def index(conn, _params) do
    render(conn, :index, layout: false)
  end
end
