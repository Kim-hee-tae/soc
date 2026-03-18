// tactics-core.js
const tactics = {
    '442': [[50,5],[18,16],[39,16],[61,16],[82,16],[18,31],[39,31],[61,31],[82,31],[35,44],[65,44]],
    // ... 나머지 포메이션 데이터
};

let players = { top: [], bottom: [] };
let currentScale = 1.0;

function createTeam(pitchEl, team, makeDraggableFn) {
    for (let i = 0; i < 11; i++) {
        const p = document.createElement('div');
        p.className = `player team-${team}`;
        p.dataset.id = `${team}-${i}`;
        p.innerText = i + 1;
        pitchEl.appendChild(p);
        players[team].push(p);
        if (makeDraggableFn) makeDraggableFn(p);
    }
    resetToBasic(team);
}

function resetToBasic(team) {
    const isTop = (team === 'top');
    players[team].forEach((p, i) => {
        p.style.left = `${(100/12) * (i+1)}%`;
        p.style.top = isTop ? '4%' : '96%';
    });
}

function updatePlayerScale(ball) {
    [...players.top, ...players.bottom, ball].forEach(el =>
        el.style.transform = `translate(-50%, -50%) scale(${currentScale})`);
}
