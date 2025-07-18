export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;
  const {message} = req.body || {};
  if (!message) return res.status(400).json({reply: "메시지를 입력해주세요."});

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {"Content-Type":"application/json","Authorization":`Bearer ${key}`},
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role:"system", content:"당신은 60대 이상 시니어를 친절히 돕는 GPT 챗봇입니다."}, {role:"user", content:message}]
    })
  });
  const json = await resp.json();
  const reply = json.choices?.[0]?.message?.content || "죄송하지만 응답할 수 없습니다.";
  res.status(200).json({reply});
}
