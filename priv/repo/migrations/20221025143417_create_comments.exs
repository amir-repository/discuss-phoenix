defmodule App.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :content, :string
      add :user_id, references(:user)
      add :topic_id, references(:topics)
      timestamps()
    end
  end
end
