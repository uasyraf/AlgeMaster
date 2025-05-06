// filepath: /home/ummar/AlgeMaster/src/routes/standard-pembelajaran/[slug]/games/+page.js
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        slug: params.slug
    };
}