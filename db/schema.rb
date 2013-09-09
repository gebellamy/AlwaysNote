# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130909170428) do

  create_table "contributions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "notebook_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "contributions", ["notebook_id"], :name => "index_contributions_on_notebook_id"
  add_index "contributions", ["user_id", "notebook_id"], :name => "index_contributions_on_user_id_and_notebook_id"
  add_index "contributions", ["user_id"], :name => "index_contributions_on_user_id"

  create_table "note_taggings", :force => true do |t|
    t.integer  "note_id",    :null => false
    t.integer  "tag_id",     :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "note_taggings", ["note_id", "tag_id"], :name => "index_note_taggings_on_note_id_and_tag_id", :unique => true
  add_index "note_taggings", ["note_id"], :name => "index_note_taggings_on_note_id"
  add_index "note_taggings", ["tag_id"], :name => "index_note_taggings_on_tag_id"

  create_table "notebooks", :force => true do |t|
    t.integer  "owner_id"
    t.string   "title",      :default => "New Notebook"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "notebooks", ["owner_id"], :name => "index_notebooks_on_owner_id"

  create_table "notes", :force => true do |t|
    t.integer  "owner_id",                                 :null => false
    t.integer  "notebook_id",                              :null => false
    t.string   "title",       :default => "Untitled Note"
    t.text     "body"
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
  end

  add_index "notes", ["notebook_id"], :name => "index_notes_on_notebook_id"
  add_index "notes", ["owner_id"], :name => "index_notes_on_owner_id"

  create_table "tags", :force => true do |t|
    t.string   "title",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "tags", ["title"], :name => "index_tags_on_title"

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.string   "session_token"
    t.string   "email"
    t.string   "base_email"
    t.string   "auth_token"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.boolean  "authenticated",   :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email"
  add_index "users", ["session_token"], :name => "index_users_on_session_token"
  add_index "users", ["username"], :name => "index_users_on_username"

end
