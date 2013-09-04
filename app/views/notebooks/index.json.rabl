collection @notebooks

attributes :owner_id, :title, :id

child :notes do
	attributes :owner_id, :notebook_id, :title, :body
end