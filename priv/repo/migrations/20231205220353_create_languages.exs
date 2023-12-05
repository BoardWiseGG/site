defmodule BoardWise.Repo.Migrations.CreateLanguages do
  use Ecto.Migration

  @prefix "coach_scraper"

  def change do
    create table(:languages, prefix: @prefix) do
      add :code, :string, null: false
      add :name, :string, null: false
    end

    create unique_index(
             :languages,
             [:code],
             prefix: @prefix,
             name: "code_unique"
           )
  end
end
