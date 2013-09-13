collection @tags

attributes :id, :title

child :notes do 
	attributes :body, :notebook_id, :id, :owner_id, :title, :updated_at, :created_at
end