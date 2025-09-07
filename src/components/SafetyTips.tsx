export default function SafetyTips() {
  return (
    <section
      id="safety"
      className="mx-auto mt-16 max-w-3xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60 p-6"
    >
      <h3 className="text-lg font-semibold">Safety tips</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
        <li>Don’t share personal info (full name, phone, address, passwords, OTPs).</li>
        <li>Be kind. Leave if the chat feels off — you owe strangers nothing.</li>
        <li>This demo is frontend-only; refresh clears the chat and state.</li>
      </ul>
    </section>
  );
}
