object @notebook

attributes :id, :title, :owner_id

child :notes do
	attributes :owner_id, :notebook_id, :title, :body
end