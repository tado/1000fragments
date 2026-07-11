uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.039, 0.045, 0.010);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.60 + 0.12 * vec2(sin(time * 2.74 + hc.x * 6.2831853), cos(time * 2.66 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.26);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.47 + time * 1.26)) * (0.019 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 2.78 + time * 8.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
