defmodule BoardWise.Coaches.Coach do
  @moduledoc """
  Table `coach_scraper.export` containing all scraped coach information.

  Notice this table does not exist in the `public` schema.

  This table is managed by an external utility [coach-scraper](https://github.com/boardwise-gg/coach-scraper).
  Said utility is responsible for periodically rewriting the entries in the
  table with fresh data. For the time-being, avoid using any of the mutative
  functions found in the `Coach` context.
  """

  use Ecto.Schema
  import Ecto.Changeset

  schema "export" do
    field :blitz, :integer
    field :bullet, :integer
    field :rapid, :integer
    field :site, :string
    field :username, :string
  end

  @doc false
  def changeset(coach, attrs) do
    coach
    |> cast(attrs, [:rapid, :blitz, :bullet, :site, :username])
    |> validate_required([:rapid, :blitz, :bullet, :site, :username])
  end
end
