defmodule BoardWise.Languages.Language do
  use Ecto.Schema
  import Ecto.Changeset

  schema "languages" do
    field :code, :string
    field :name, :string
  end

  @doc false
  def changeset(language, attrs) do
    language
    |> cast(attrs, [:code, :name])
    |> validate_required([:code, :name])
    |> unique_constraint(:code_unique, name: :code_unique)
  end
end
