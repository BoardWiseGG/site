defmodule BoardWise.Coach do
  use Ecto.Schema
  import Ecto.Changeset

  schema "coaches" do
    field :blitz, :integer
    field :bullet, :integer
    field :rapid, :integer
    field :site, :string
    field :username, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(coach, attrs) do
    coach
    |> cast(attrs, [:site, :username, :rapid, :blitz, :bullet])
    |> validate_required([:site, :username, :rapid, :blitz, :bullet])
  end
end
