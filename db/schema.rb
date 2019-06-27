# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190208092436) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "cart_products", force: :cascade do |t|
    t.bigint "order_id"
    t.bigint "product_id"
    t.decimal "quantity", precision: 9, scale: 2, default: "1.0"
    t.index ["order_id"], name: "index_cart_products_on_order_id"
    t.index ["product_id"], name: "index_cart_products_on_product_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "image"
    t.integer "parent_category_id"
    t.integer "warning_amount"
  end

  create_table "characteristics", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "product_dimension_id"
    t.bigint "product_id"
    t.index ["product_id"], name: "index_characteristics_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.decimal "total", precision: 9, scale: 2
    t.datetime "sent_at"
    t.datetime "shipped_at"
    t.datetime "cancelled_at"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "parent_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.decimal "price", precision: 9, scale: 2
    t.json "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "minimal_order", default: "1"
    t.string "delivery_time"
    t.bigint "category_id"
    t.boolean "is_popular", default: false
    t.boolean "is_related", default: false
    t.integer "related_category_id"
    t.integer "quantity", default: 10
    t.json "attachments"
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "shipping_infos", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "country"
    t.string "city"
    t.string "province"
    t.string "address"
    t.string "zip"
    t.string "telephone"
    t.bigint "user_id"
    t.bigint "order_id"
    t.index ["order_id"], name: "index_shipping_infos_on_order_id"
    t.index ["user_id"], name: "index_shipping_infos_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "email_verified", default: false
    t.string "verification_code"
    t.string "provider"
    t.string "uid"
    t.string "oauth_token"
    t.string "company"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "address"
    t.boolean "blocked", default: false
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "categories", "parent_categories"
  add_foreign_key "characteristics", "products", column: "product_dimension_id"
  add_foreign_key "products", "categories", column: "related_category_id"
end
