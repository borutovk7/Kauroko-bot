const { execSync } = require('child_process');

console.log('🚀 Iniciando atualização automática do Kaoruko Waguri...');

try {
    console.log('📦 Verificando atualizações no GitHub...');
    execSync('git fetch --all');
    
    console.log('💾 Salvando configurações locais...');
    execSync('git stash');
    
    console.log('🔄 Sincronizando com o repositório...');
    execSync('git reset --hard origin/main');
    
    console.log('📂 Restaurando configurações locais...');
    try { execSync('git stash pop'); } catch (e) { /* Caso não tenha nada no stash */ }
    
    console.log('⚙️ Verificando novas dependências...');
    execSync('npm install');
    
    console.log('✅ Atualização concluída com sucesso!');
} catch (error) {
    console.error('❌ Erro durante a atualização:', error.message);
}
