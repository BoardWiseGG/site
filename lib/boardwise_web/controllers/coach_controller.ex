defmodule BoardWiseWeb.CoachController do
  use BoardWiseWeb, :controller

  alias BoardWise.Coaches
  alias BoardWise.Coaches.QueryParams

  def index(conn, params) do
    query_params =
      %QueryParams{}
      |> override_param(:rapid_gte, params, :integer)
      |> override_param(:rapid_lte, params, :integer)
      |> override_param(:blitz_gte, params, :integer)
      |> override_param(:blitz_lte, params, :integer)
      |> override_param(:bullet_gte, params, :integer)
      |> override_param(:bullet_lte, params, :integer)
      |> override_param(:languages, params, :strlist)
      |> override_param(:page_no, params, :integer)
      |> override_param(:page_size, params, :integer)

    # Ensure we never attempt to query too large of a response all at once.
    query_params = %{query_params | page_size: Enum.min([query_params.page_size, 25])}

    coaches = Coaches.list_coaches(query_params)
    render(conn, :index, coaches: coaches)
  end

  defp override_param(query_params, key, params, type) do
    case Map.get(params, Atom.to_string(key)) do
      nil ->
        query_params

      val when type == :strlist ->
        %{query_params | key => String.split(val, ",")}

      val when type == :integer ->
        case Integer.parse(val) do
          {parsed, ""} -> %{query_params | key => parsed}
          _ -> query_params
        end
    end
  end
end
