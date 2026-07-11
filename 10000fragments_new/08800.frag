uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	vec3 col = vec3(0.004, 0.047, 0.009);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.74 + 0.23 * vec2(sin(time * 2.85 + hc.x * 6.2831853), cos(time * 0.81 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.24, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.91 + time * 1.04)) * (0.031 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 0.83 + time * 7.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
