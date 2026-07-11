uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	vec3 col = vec3(0.011, 0.042, 0.065);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.58 + 0.19 * vec2(sin(time * 2.25 + hc.x * 6.2831853), cos(time * 2.70 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.59 + time * 1.40)) * (0.036 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 2.94 + time * 15.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
