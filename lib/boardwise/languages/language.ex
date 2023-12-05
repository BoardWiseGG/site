defmodule BoardWise.Languages.Language do
  use Ecto.Schema
  import Ecto.Changeset

  schema "languages" do
    field :code, :string
    field :name, :string
    field :pos, :integer
  end

  @doc false
  def changeset(language, attrs) do
    language
    |> cast(attrs, [:code, :name, :pos])
    |> validate_required([:code, :name, :pos])
    |> unique_constraint(:code_unique, name: :code_unique)
  end
end
