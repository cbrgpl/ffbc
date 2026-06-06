
Enum "input_characteristics_type" {
  "number"
  "measuring"
  "text"
  "boolean"
  "media"
}

Enum "service_modifiers_type" {
  "single"
  "multiple"
}

Enum "service_type" {
  "creation"
  "selling"
}

Enum "service_status" {
  "base_info_required"
  "media_required"
  "active"
  "disabled"
}

Table "services" {
  "id" integer [pk, increment]
  "name" varchar [not null]
  "base_price" numeric(14,2) [not null, check: `"base_price" >= 0`]
  "description" text
  "type" service_type [not null]
  "status" service_status [not null]
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "service_categories" {
  "id" integer [pk, increment]
  "name" varchar [unique, not null]
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "service_category_services" {
  "service_id" integer [not null]
  "service_category_id" integer [not null]

  Indexes {
    (service_id, service_category_id) [pk]
  }
}

Table "input_characteristics_templates" {
  "id" integer [pk, increment]
  "name" varchar [not null]
  "description" text
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "input_characteristics" {
  "id" integer [pk, increment]
  "name" varchar [not null]
  "type" input_characteristics_type [not null]
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "input_characteristic_template_items" {
  "template_id" integer [not null]
  "input_characteristic_id" integer [not null]

  Indexes {
    (template_id, input_characteristic_id) [pk]
  }
}

Table "service_media_files" {
  "id" integer [pk, increment]
  "service_id" integer [not null]
  "storage_key" text [not null]
  "mime_type" varchar(255) [not null]
  "alt_text" text
  "caption" text
  "sort_order" integer [check: `"sort_order" >= 0`]
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "service_input_characteristics" {
  "input_characteristics_id" integer [not null]
  "service_id" integer [not null]
  "is_required" boolean [not null, default: true]
  "sort_order" integer [check: `"sort_order" >= 0`]

  Indexes {
    (input_characteristics_id, service_id) [pk]
  }
}

Table "service_modifiers" {
  "id" integer [pk, increment]
  "service_id" integer [not null]
  "name" varchar [not null]
  "selection_type" service_modifiers_type [not null]
  "sort_order" integer [check: `"sort_order" >= 0`]
  "is_required" boolean [not null, default: true]
}

Table "service_modifier_values" {
  "id" integer [pk, increment]
  "name" varchar [not null]
  "service_modifier_id" integer [not null]
  "additional_price" numeric(14,2) [not null, check: `"additional_price" >= 0`, default: 0]
  "is_active" boolean [not null, default: true]
  "sort_order" integer [check: `"sort_order" >= 0`]
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "service_products" {
  "id" integer [pk, increment]
  "service_id" integer [not null]
  "name" varchar [not null]
  "is_draft" bool [not null]
  "auto_calculated_price" numeric(14,2) [not null, check: `"auto_calculated_price" >= 0`]
  "confirmed_price" numeric(14,2) [not null, check: `"confirmed_price" >= 0`]
  "comment" text
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]
}

Table "service_product_input_characteristics_values" {
  "id" integer [pk, increment]
  "input_characteristics_id" integer [not null]
  "service_product_id" integer [not null]
  "number_value" numeric
  "measuring_value" numeric
  "text_value" text
  "boolean_value" boolean
  "media_file" text
  "created_at" timestamptz [not null, default: `now()`]
  "updated_at" timestamptz [not null, default: `now()`]

  Checks {
    `num_nonnulls(
                    "number_value",
                    "measuring_value",
                    "text_value",
                    "boolean_value",
                    "media_file"
            ) = 1` [name: 'input_characteristics_values_only_one_value_check']
  }

  Indexes {
    (service_product_id, input_characteristics_id) [unique, name: "input_characteristics_values_product_characteristic_unique"]
  }
}

Table "service_products_modifier_values" {
  "service_product_id" integer [not null]
  "modifier_value_id" integer [not null]

  Indexes {
    (service_product_id, modifier_value_id) [pk]
  }
}

Ref "service_categories_creation_service_id_fk":"services"."id" < "service_category_services"."service_id"

Ref "service_categories_service_category_id_fk":"service_categories"."id" < "service_category_services"."service_category_id"

Ref "input_characteristic_template_items_template_id_fk":"input_characteristics_templates"."id" < "input_characteristic_template_items"."template_id"

Ref "input_characteristic_template_items_input_characteristic_id_fk":"input_characteristics"."id" < "input_characteristic_template_items"."input_characteristic_id"

Ref "service_media_files_service_id_fk":"services"."id" < "service_media_files"."service_id"

Ref "service_input_characteristics_input_characteristics_id_fk":"input_characteristics"."id" < "service_input_characteristics"."input_characteristics_id"

Ref "service_input_characteristics_service_id_fk":"services"."id" < "service_input_characteristics"."service_id"

Ref "service_modifiers_service_id_fk":"services"."id" < "service_modifiers"."service_id"

Ref "service_modifier_values_service_modifier_id_fk":"service_modifiers"."id" < "service_modifier_values"."service_modifier_id"

Ref "service_products_service_id_fk":"services"."id" < "service_products"."service_id"

Ref "input_characteristics_values_input_characteristics_id_fk":"input_characteristics"."id" < "service_product_input_characteristics_values"."input_characteristics_id"

Ref "input_characteristics_values_service_product_id_fk":"service_products"."id" < "service_product_input_characteristics_values"."service_product_id"

Ref "service_products_modifier_values_product_id_fk":"service_products"."id" < "service_products_modifier_values"."service_product_id"

Ref "service_products_modifier_values_modifier_value_id_fk":"service_modifier_values"."id" < "service_products_modifier_values"."modifier_value_id"
