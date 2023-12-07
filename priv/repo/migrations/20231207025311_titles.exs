defmodule BoardWise.Repo.Migrations.Titles do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    alter table(:export, prefix: @prefix) do
      add :title, :string
    end
  end
end
