defmodule PhoenixSvelte.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_svelte,
    adapter: Ecto.Adapters.Postgres
end
