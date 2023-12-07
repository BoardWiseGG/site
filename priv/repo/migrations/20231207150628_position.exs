defmodule BoardWise.Repo.Migrations.Position do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    alter table(:export, prefix: @prefix) do
      add :position, :integer
    end
  end
end
