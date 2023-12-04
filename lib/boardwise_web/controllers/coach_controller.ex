defmodule BoardWiseWeb.CoachController do
  use BoardWiseWeb, :controller

  alias BoardWise.Coaches

  def index(conn, _params) do
    coaches = Coaches.list_coaches()
    render(conn, :index, coaches: coaches)
  end
end
