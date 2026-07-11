uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.x = abs(p.x) - 0.25;
	vec3 col = vec3(0.015, 0.040, 0.026);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.23 + 0.11 * vec2(sin((time * 0.81) * 0.97 + hc.x * 6.2831853), cos((time * 0.81) * 2.97 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.19);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.55) + fi * 0.54 + (time * 0.81) * 1.11)) * (0.037 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.003, 0.954) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
