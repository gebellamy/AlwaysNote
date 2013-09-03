collection @notebooks

attributes :owner_id, :title

child :notes do
	attributes :owner_id, :notebook_id, :title, :body
end