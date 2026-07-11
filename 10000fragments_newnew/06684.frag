uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec3 col = vec3(0.029, 0.003, 0.028);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.61 + 0.14 * vec2(sin(time * 2.61 + hc.x * 6.2831853), cos(time * 1.78 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.11 + time * 0.43)) * (0.013 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
