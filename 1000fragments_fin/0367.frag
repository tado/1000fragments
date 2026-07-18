uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 1.99 + (time * 0.72) * 0.51) * 0.19;
	p *= 2.79;
	vec3 col = mix(vec3(0.038, 0.058, 0.042), vec3(0.031, 0.059, 0.046), clamp(0.5 + p.y * -0.42 + p.x * -0.14, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.37 + 0.28 * vec2(sin((time * 0.72) * 2.15 + hc.x * 6.2831853), cos((time * 0.72) * 1.31 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(1.705, 3.418, 5.132) + fi * 1.68 + (time * 0.72) * 1.11)) * (0.025 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.050, 0.993, 0.923);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
