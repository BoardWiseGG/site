defmodule BoardWise.CoachesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `BoardWise.Coaches` context.
  """

  @doc """
  Generate a coach.
  """
  def coach_fixture(attrs \\ %{}) do
    {:ok, coach} =
      attrs
      |> Enum.into(%{
        blitz: 42,
        bullet: 42,
        rapid: 42,
        site: "some site",
        username: "some username"
      })
      |> BoardWise.Coaches.create_coach()

    coach
  end
end
