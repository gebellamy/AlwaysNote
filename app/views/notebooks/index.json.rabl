collection @notebooks

attributes :owner_id, :title, :id

child :notes do
	attributes :owner_id, :notebook_id, :title, :body, :updated_at, :id, :created_at
	
	child :tags do
		attributes :title, :id
	end
end