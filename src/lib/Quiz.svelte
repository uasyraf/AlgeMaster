<!-- src/lib/Quiz.svelte -->
<script>
    export let question;
    export let options;
    export let onAnswer;  // fungsi callback apabila jawapan dihantar

    let selected = "";    // jawapan yang dipilih oleh pengguna

    function submitAnswer() {
      if (onAnswer) {
        onAnswer(selected);  // panggil callback dengan jawapan yang dipilih
      }
    }
  </script>

  <div class="quiz">
    <p class="question">{question}</p>
    {#each options as opt}
      <div>
        <label>
          <input type="radio" bind:group={selected} value={opt} />
          {opt}
        </label>
      </div>
    {/each}
    <button on:click={submitAnswer} disabled={!selected}>Hantar Jawapan</button>
  </div>

  <style>
    .quiz { background: #fff3cd; padding: 1em; border-radius: 5px; }
    .question { font-weight: bold; margin-bottom: 0.5em; }
    button { margin-top: 0.5em; }
  </style>
