export async function onRequestPost(context) {
  try {
    const { name, data } = await context.request.json();
    const id = `tactic_${Date.now()}`;
    
    // KV에 저장 (Key: tactic_123..., Value: {name, data})
    await context.env.TACTICS.put(id, JSON.stringify({ id, name, data }));
    
    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
