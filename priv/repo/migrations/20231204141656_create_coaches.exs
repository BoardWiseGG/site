defmodule BoardWise.Repo.Migrations.CreateCoaches do
  use Ecto.Migration

  # We are not responsible for generating this table in production. This
  # migration exists for testing purposes
  def change do
    execute "CREATE SCHEMA IF NOT EXISTS coach_scraper"

    create_if_not_exists table(:export, prefix: "coach_scraper") do
      add :site, :string
      add :username, :string
      add :rapid, :integer
      add :blitz, :integer
      add :bullet, :integer
    end
  end
end
