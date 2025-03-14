<!-- src/routes/learn.svelte -->
<script>
    // Anda boleh memuatkan kandungan dari fail JSON atau pangkalan data jika perlu
</script>

<h2>Nota Pembelajaran: Ungkapan Algebra (Tingkatan 1, 5.1)</h2>
<p>
    <strong>Pemboleh ubah</strong> ialah kuantiti yang nilainya tidak diketahui
    dan diwakili oleh huruf (cth: <code>x</code>, <code>y</code>). Nilai
    pemboleh ubah boleh jadi tetap atau berubah mengikut situasi.
</p>
<p>
    <strong>Ungkapan algebra</strong> boleh diterbitkan daripada situasi harian.
    Contohnya, jika <code>x</code> mewakili bilangan blok kayu dalam sebuah beg,
    maka situasi "3 blok kayu dimasukkan ke dalam beg" boleh diwakili oleh
    ungkapan <code>x + 3</code>.
</p>

<h3>Video Pembelajaran</h3>
<div class="video-container">
    <!-- Video YouTube tentang pengenalan algebra (gantikan VIDEO_ID dengan id video sebenar) -->
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Pengenalan Ungkapan Algebra"
        frameborder="0"
        allowfullscreen
    >
    </iframe>
</div>

<style>
    /* Gaya responsif untuk video */
    .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        height: 0;
        overflow: hidden;
        max-width: 100%;
    }
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
