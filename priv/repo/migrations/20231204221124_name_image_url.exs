defmodule BoardWise.Repo.Migrations.NameImageUrl do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    alter table(:export, prefix: @prefix) do
      add :name, :string
      add :image_url, :string
    end
  end
end
