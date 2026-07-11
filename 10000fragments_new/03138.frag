uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	vec3 col = vec3(0.055, 0.004, 0.011);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.28 + 0.12 * vec2(sin(time * 2.95 + hc.x * 6.2831853), cos(time * 2.42 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.08 + time * 0.50)) * (0.034 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
