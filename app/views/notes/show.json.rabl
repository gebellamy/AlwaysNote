object @note

attributes :id, :owner_id, :title, :body, :updated_at, :created_at

child :tags do
	attributes :title, :id
end