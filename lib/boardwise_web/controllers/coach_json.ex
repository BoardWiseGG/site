defmodule BoardWiseWeb.CoachJSON do
  alias BoardWise.Coaches.Coach

  @doc """
  Renders a list of coaches.
  """
  def index(%{coaches: coaches}) do
    %{data: for(coach <- coaches, do: data(coach))}
  end

  defp data(%Coach{} = coach) do
    %{
      site: coach.site,
      username: coach.username,
      name: coach.name,
      image_url: coach.image_url,
      rapid: coach.rapid,
      blitz: coach.blitz,
      bullet: coach.bullet
    }
  end
end
