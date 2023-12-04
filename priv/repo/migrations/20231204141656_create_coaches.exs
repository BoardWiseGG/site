defmodule BoardWise.Repo.Migrations.CreateCoaches do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    execute "CREATE SCHEMA coach_scraper"

    create table(:export, prefix: @prefix) do
      add :site, :string, null: false
      add :username, :string, null: false
      add :rapid, :integer
      add :blitz, :integer
      add :bullet, :integer
    end

    create unique_index(
             :export,
             [:site, :username],
             prefix: @prefix,
             name: "site_username_unique"
           )
  end
end
