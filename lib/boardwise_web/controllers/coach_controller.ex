defmodule BoardWiseWeb.CoachController do
  use BoardWiseWeb, :controller
  require Logger

  alias BoardWise.Coaches

  plug :fetch_query_params

  def index(conn, params) do
    page_no = get_integer_param(params, "page_no", 1)
    page_size = get_integer_param(params, "page_size", 10)
    coaches = Coaches.page_coaches(page_no, page_size)
    render(conn, :index, coaches: coaches)
  end

  defp get_integer_param(params, key, default) do
    val = Map.get(params, key)

    if is_nil(val) do
      default
    else
      case Integer.parse(val) do
        {parsed, ""} -> parsed
        _ -> default
      end
    end
  end
end
