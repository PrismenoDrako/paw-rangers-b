
/**
 * Generador de módulos con arquitectura hexagonal
 * Ejecuta internamente el comando de NestJS para generar el módulo
 * y luego organiza las carpetas (domain, application, infrastructure)
 */

const { execSync } = require('child_process');
const { mkdirSync, existsSync, renameSync } = require('fs');
const { join } = require('path');

const moduleName = process.argv[2];

if (!moduleName) {
	console.error('❌ Debes especificar el nombre del módulo: npm run make:module users');
	process.exit(1);
}

try {
	const basePath = join(__dirname, '..', 'src', 'modules', moduleName);

	console.log(`Generando módulo "${moduleName}" con Nest CLI...`);
	execSync(`npx nest g module modules/${moduleName}`, { stdio: 'inherit' });



	const folders = [
		'domain/entities',
		'domain/value-objects',
		'domain/repositories',
		'domain/services',
		'domain/events',
		'application/use-cases',
		'application/dto',
		'application/mappers',
		'infrastructure/persistence/orm-entities',
		'infrastructure/persistence/repositories',
		'infrastructure/controllers',
		'infrastructure/interceptors',
		'infrastructure/guards',
		'infrastructure/subscribers',
	];

	folders.forEach((folder) => {
		const fullPath = join(basePath, folder);
		mkdirSync(fullPath, { recursive: true });
	});

	// Mover el archivo module dentro de la carpeta del módulo (si quedó afuera)
	const oldPath = join(__dirname, '..', 'src', 'modules', `${moduleName}.module.ts`);
	const newPath = join(basePath, `${moduleName}.module.ts`);

	if (existsSync(oldPath) && !existsSync(newPath)) {
		renameSync(oldPath, newPath);
		console.log('📦 Módulo movido correctamente a su carpeta.');
	}

	console.log('✅ Módulo generado con estructura hexagonal.');
} catch (error) {
	console.error('❌ Error al generar el módulo:', error.message);
	process.exit(1);
}