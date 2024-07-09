import Leaderboard from "@/components/shared/Leaderboard";

async function getLeaderboardData() {
  const page = 1;
  const limit = 100;
  const sort = "-credit";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/leaderboard?page=${page}&limit=${limit}&sort=${sort}`,
    {next: {revalidate: 43200}}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }
  return res.json();
}

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();
  return (
    <>
      <Leaderboard data={data} />
    </>
  );
}
