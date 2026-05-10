const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

// .env.local 파일을 읽어 필요한 환경변수를 현재 프로세스에 주입
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main() {
  const rootDir = path.resolve(__dirname, "..");
  const envPath = path.join(rootDir, ".env.local");
  const inputFileName = process.argv[2] || "marathons_rows.json";
  const jsonPath = path.join(__dirname, inputFileName);

  loadEnvFile(envPath);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 없습니다.",
    );
  }

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`JSON 파일을 찾을 수 없습니다: ${jsonPath}`);
  }

  const rows = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("삽입할 마라톤 데이터가 없습니다.");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const chunkSize = 100;

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);

    // id를 포함한 전체 row를 그대로 upsert
    const { error } = await supabase
      .from("marathons")
      .upsert(chunk, { onConflict: "id" });

    if (error) {
      throw error;
    }

    console.log(
      `[${i + 1}-${Math.min(i + chunk.length, rows.length)}] ${chunk.length}건 처리 완료`,
    );
  }

  console.log(`총 ${rows.length}건 업로드가 완료되었습니다.`);
}

main().catch((error) => {
  console.error("마라톤 데이터 업로드 실패:", error);
  process.exit(1);
});
