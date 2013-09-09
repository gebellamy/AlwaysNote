object @note

attributes :id, :owner_id, :title, :body, :updated_at

child :tags do
	attributes :title, :id
end