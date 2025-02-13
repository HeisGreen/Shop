import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product-schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
