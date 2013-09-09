object @notebook

attributes :id, :title, :owner_id

child :notes do
	attributes :owner_id, :notebook_id, :title, :body, :updated_at, :id, :created_at
	
	child :tags do 
		attributes :id, :title
	end
end