module Stars
using CSV, DataFrames

struct Star
    id :: Int64
    name :: String
    ra :: Float64
    dec :: Float64
    distance :: Float64  # in parsecs, 1 parsec = 3.262 light years
    mag :: Float32
    absmag :: Float32
    spectrum :: Char
end

# Only need to be run once to format
function _read_data(filename)
    stars = CSV.read(filename, DataFrames.DataFrame)
    to_write = []
    num = 1
    for row in eachrow(stars)
        # handle missing proper names
        if isequal(row.ProperName, missing) || row.ProperName == " "
            row.ProperName = ""
        end
        # skip ones that have empty spectrum
        if row.Spectrum[1] == ' '
            continue
        end
        # skip any stars that aren't bright enough to be relevant
        if row.Mag > 5.5
            continue
        end
        push!(to_write, Star(num, 
        row.ProperName, 
        row.RA, 
        row.Dec, 
        row.Distance, 
        row.Mag, 
        row.AbsMag, 
        row.Spectrum[1]))
        num += 1
    end
    
    CSV.write("$(@__DIR__)/data/stars_trimmed.csv", to_write)
end

# Get star color from spectrum
function star_color(star)
    if star.spectrum == 'K'
        color = 14
    elseif star.spectrum == 'G'
        color = 15
    elseif star.spectrum == 'F'
        color = 16
    elseif star.spectrum == 'A'
        color = 17
    elseif star.spectrum == 'B'
        color = 18
    elseif star.spectrum == 'O'
        color = 19
    else # otherwise, just make the star an M type spectrum
        color = 13
    end
    
    return color
end

# Get the stars from the trimmed file
function get_stars()
    data = CSV.read("$(@__DIR__)/data/stars_trimmed.csv", DataFrames.DataFrame)
    ret = []
    for r in eachrow(data)
        if isequal(r.name, missing)
            r.name = ""
        end
        push!(ret, Star(
            r.id, 
            r.name, 
            r.ra, 
            r.dec, 
            r.distance, 
            r.mag, 
            r.absmag, 
            r.spectrum[1]
            ))
    end
    return ret
end

# Return the star coordinates to visualize
function get_star_coordinates(stars)
    star_coordinates = []
    for star in stars
        item = Dict(
            :ra => star.ra,
            :dec => star.dec,
            :mag => star.mag,
            :color => star_color(star)
        )
        push!(star_coordinates, item)
    end
    return star_coordinates
end


end # end module
