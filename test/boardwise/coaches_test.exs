defmodule BoardWise.CoachesTest do
  use BoardWise.DataCase

  alias BoardWise.Coaches

  describe "coaches" do
    alias BoardWise.Coaches.Coach
    alias BoardWise.Coaches.QueryParams

    import BoardWise.CoachesFixtures

    @invalid_attrs %{blitz: nil, bullet: nil, rapid: nil, site: nil, username: nil}

    test "list_coaches/2 returns all coaches" do
      coach = coach_fixture()
      assert Coaches.list_coaches(%QueryParams{}) == [%{coach | score: 0}]
    end

    test "get_coach!/1 returns the coach with given id" do
      coach = coach_fixture()
      assert Coaches.get_coach!(coach.id) == coach
    end

    test "create_coach/1 with valid data creates a coach" do
      valid_attrs = %{
        blitz: 42,
        bullet: 42,
        rapid: 42,
        site: "some site",
        username: "some username"
      }

      assert {:ok, %Coach{} = coach} = Coaches.create_coach(valid_attrs)
      assert coach.blitz == 42
      assert coach.bullet == 42
      assert coach.rapid == 42
      assert coach.site == "some site"
      assert coach.username == "some username"
    end

    test "create_coach/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Coaches.create_coach(@invalid_attrs)
    end

    test "update_coach/2 with valid data updates the coach" do
      coach = coach_fixture()

      update_attrs = %{
        blitz: 43,
        bullet: 43,
        rapid: 43,
        site: "some updated site",
        username: "some updated username"
      }

      assert {:ok, %Coach{} = coach} = Coaches.update_coach(coach, update_attrs)
      assert coach.blitz == 43
      assert coach.bullet == 43
      assert coach.rapid == 43
      assert coach.site == "some updated site"
      assert coach.username == "some updated username"
    end

    test "update_coach/2 with invalid data returns error changeset" do
      coach = coach_fixture()
      assert {:error, %Ecto.Changeset{}} = Coaches.update_coach(coach, @invalid_attrs)
      assert coach == Coaches.get_coach!(coach.id)
    end

    test "delete_coach/1 deletes the coach" do
      coach = coach_fixture()
      assert {:ok, %Coach{}} = Coaches.delete_coach(coach)
      assert_raise Ecto.NoResultsError, fn -> Coaches.get_coach!(coach.id) end
    end

    test "change_coach/1 returns a coach changeset" do
      coach = coach_fixture()
      assert %Ecto.Changeset{} = Coaches.change_coach(coach)
    end
  end
end
