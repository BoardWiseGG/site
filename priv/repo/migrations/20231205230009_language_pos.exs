defmodule BoardWise.Repo.Migrations.LanguagePos do
  use Ecto.Migration

  alias BoardWise.Languages.Language

  @prefix "coach_scraper"

  def change do
    # We'll just recreate all the entries in the table.
    BoardWise.Repo.delete_all(Language, prefix: @prefix)

    alter table(:languages, prefix: @prefix) do
      add :pos, :integer, null: false
    end
  end
end
