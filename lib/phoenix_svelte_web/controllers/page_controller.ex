defmodule PhoenixSvelteWeb.PageController do
  use PhoenixSvelteWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
