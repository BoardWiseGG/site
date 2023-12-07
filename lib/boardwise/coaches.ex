defmodule BoardWise.Coaches do
  @moduledoc """
  The Coaches context.
  """

  import Ecto.Query, warn: false
  alias BoardWise.Repo

  alias BoardWise.Coaches.Coach
  alias BoardWise.Coaches.QueryParams

  @prefix "coach_scraper"

  defmacrop rating_fragment(field, gte, lte) do
    quote do
      fragment(
        """
          CASE
            WHEN ? IS NULL THEN 0
            WHEN ? IS NULL THEN 0
            WHEN ? >= ? AND ? <= ? THEN 5
            ELSE 0
          END
        """,
        type(unquote(gte), :integer),
        type(unquote(lte), :integer),
        unquote(field),
        type(unquote(gte), :integer),
        unquote(field),
        type(unquote(lte), :integer)
      )
    end
  end

  @doc """
  Return the list of coaches according to the specified params.

  ## Examples

      iex> list_coaches(%QueryParams{...})
      [%Coach{}, ...]

  """
  def list_coaches(%QueryParams{
        :rapid_gte => rapid_gte,
        :rapid_lte => rapid_lte,
        :blitz_gte => blitz_gte,
        :blitz_lte => blitz_lte,
        :bullet_gte => bullet_gte,
        :bullet_lte => bullet_lte,
        :languages => languages,
        :page_no => page_no,
        :page_size => page_size
      }) do
    Coach
    |> select([c], c)
    |> select_merge(
      [c],
      %{
        score:
          fragment(
            """
            CASE WHEN ? IS NOT NULL THEN 1000 ELSE 0 END +
            CASE WHEN ? IS NOT NULL THEN 500 ELSE 0 END +
            ? +
            ? +
            ? +
            (5 * (SELECT COUNT(*) FROM UNNEST(?) WHERE UNNEST = ANY(?)))
            """,
            c.name,
            c.image_url,
            rating_fragment(c.rapid, ^rapid_gte, ^rapid_lte),
            rating_fragment(c.blitz, ^blitz_gte, ^blitz_lte),
            rating_fragment(c.bullet, ^bullet_gte, ^bullet_lte),
            type(^languages, {:array, :string}),
            c.languages
          )
          |> selected_as(:score)
      }
    )
    |> order_by(desc: selected_as(:score), asc: :username)
    |> limit(^page_size)
    |> offset(^((page_no - 1) * page_size))
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
