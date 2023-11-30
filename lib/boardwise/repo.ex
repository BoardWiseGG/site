defmodule BoardWise.Repo do
  use Ecto.Repo,
    otp_app: :boardwise,
    adapter: Ecto.Adapters.Postgres
end
