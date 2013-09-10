object @tag

attributes :id, :title

child :notes do
	attributes :body, :notebook_id, :id, :owner_id, :title, :updated_at
end