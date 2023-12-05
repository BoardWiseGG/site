defmodule BoardWise.Coaches do
  @moduledoc """
  The Coaches context.
  """

  import Ecto.Query, warn: false
  alias BoardWise.Repo

  alias BoardWise.Coaches.Coach

  @prefix "coach_scraper"

  @doc """
  Returns the list of coaches.

  ## Examples

      iex> list_coaches()
      [%Coach{}, ...]

  """
  def list_coaches do
    Coach
    |> limit(6)
    |> Repo.all(prefix: @prefix)
  end

  @doc """
  Gets a single coach.

  Raises `Ecto.NoResultsError` if the Coach does not exist.

  ## Examples

      iex> get_coach!(123)
      %Coach{}

      iex> get_coach!(456)
      ** (Ecto.NoResultsError)

  """
  def get_coach!(id), do: Repo.get!(Coach, id, prefix: @prefix)

  @doc """
  Creates a coach.

  ## Examples

      iex> create_coach(%{field: value})
      {:ok, %Coach{}}

      iex> create_coach(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_coach(attrs \\ %{}) do
    %Coach{}
    |> Coach.changeset(attrs)
    |> Repo.insert(prefix: @prefix)
  end

  @doc """
  Updates a coach.

  ## Examples

      iex> update_coach(coach, %{field: new_value})
      {:ok, %Coach{}}

      iex> update_coach(coach, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_coach(%Coach{} = coach, attrs) do
    coach
    |> Coach.changeset(attrs)
    |> Repo.update(prefix: @prefix)
  end

  @doc """
  Deletes a coach.

  ## Examples

      iex> delete_coach(coach)
      {:ok, %Coach{}}

      iex> delete_coach(coach)
      {:error, %Ecto.Changeset{}}

  """
  def delete_coach(%Coach{} = coach) do
    Repo.delete(coach, prefix: @prefix)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking coach changes.

  ## Examples

      iex> change_coach(coach)
      %Ecto.Changeset{data: %Coach{}}

  """
  def change_coach(%Coach{} = coach, attrs \\ %{}) do
    Coach.changeset(coach, attrs)
  end
end
