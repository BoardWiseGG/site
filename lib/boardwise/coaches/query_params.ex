defmodule BoardWise.Coaches.QueryParams do
  defstruct [
    :rapid_gte,
    :rapid_lte,
    :blitz_gte,
    :blitz_lte,
    :bullet_gte,
    :bullet_lte,
    :languages,
    page_no: 1,
    page_size: 15
  ]
end
