import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// This script should be run locally to push your JSON data to Supabase
// Usage: node scripts/migrate.mjs (rename to .mjs or use ts-node)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Migration failed: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
    try {
        console.log('--- Starting Migration ---');

        // 1. Migrate Categories
        const categoriesData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'categories.json'), 'utf-8'));
        console.log(`Found ${categoriesData.categories.length} categories. Syncing...`);

        const { error: catError } = await supabase
            .from('categories')
            .upsert(categoriesData.categories);

        if (catError) throw catError;
        console.log('✅ Categories synced.');

        // 2. Migrate Products
        const productsData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'products.json'), 'utf-8'));
        console.log(`Found ${productsData.products.length} products. Syncing...`);

        const { error: prodError } = await supabase
            .from('products')
            .upsert(productsData.products);

        if (prodError) throw prodError;
        console.log('✅ Products synced.');

        console.log('--- Migration Complete! ---');
    } catch (error) {
        console.error('❌ Migration Error:', error);
    }
}

migrate();
