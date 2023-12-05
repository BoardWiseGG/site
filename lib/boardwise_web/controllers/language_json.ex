defmodule BoardWiseWeb.LanguageJSON do
  alias BoardWise.Languages.Language

  @doc """
  Renders a list of coaches.
  """
  def index(%{langs: langs}) do
    %{data: for(lang <- langs, do: data(lang))}
  end

  defp data(%Language{} = lang) do
    %{
      code: lang.code,
      name: lang.name
    }
  end
end
