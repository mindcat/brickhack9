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

function read_data(filename)
    stars = CSV.read(filename, DataFrames.DataFrame)
    ret = []
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
        push!(ret, Star(num, 
        row.ProperName, 
        row.RA, 
        row.Dec, 
        row.Distance, 
        row.Mag, 
        row.AbsMag, 
        row.Spectrum[1]))
        num += 1
    end
    return ret
end

end # end module
