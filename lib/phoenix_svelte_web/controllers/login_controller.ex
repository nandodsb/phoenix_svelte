defmodule PhoenixSvelteWeb.LoginController do
  use PhoenixSvelteWeb, :controller

  def login(conn, _params) do
    render(conn, "index.html")
  end
end
