defmodule App.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:email]}

  schema "user" do
    field :email, :string
    field :provider, :string
    field :token, :string
    has_many :topics, App.Topic
    has_many :comments, App.Comment

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :provider, :token])
    |> validate_required([:email, :provider, :token])
  end
end
