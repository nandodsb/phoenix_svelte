defmodule PhoenixSvelteWeb.RegisterController do
  use PhoenixSvelteWeb, :controller

  def register(conn, _params) do
    render(conn, "index.html")
  end
end
