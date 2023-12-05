defmodule BoardWise.Repo.Migrations.Languages do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    alter table(:export, prefix: @prefix) do
      add :languages, {:array, :string}
    end
  end
end
