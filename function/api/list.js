export async function onRequestGet(context) {
  try {
    // KV에서 모든 키 목록 가져오기
    const list = await context.env.TACTICS.list();
    const results = await Promise.all(
      list.keys.map(async (key) => {
        const value = await context.env.TACTICS.get(key.name);
        return JSON.parse(value);
      })
    );

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
