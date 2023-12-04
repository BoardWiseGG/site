defmodule BoardWise.Coaches.Coach do
  @moduledoc """
  Table `coach_scraper.export` containing all scraped coach information.

  Though initially created by our Phoenix application, the data found within
  this table is managed by an external utility:
  [coach-scraper](https://github.com/boardwise-gg/coach-scraper).

  The `coach-scraper` app is responsible for periodically rewriting the entries
  in the table with fresh data. For the time-being, avoid using any of the
  mutative functions found in the `Coach` context.
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
    |> validate_required([:site, :username])
    |> unique_constraint(:site_username_unique, name: :site_username_unique)
  end
end
