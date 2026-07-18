uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.45;
	p *= 2.53;
	vec3 col = mix(vec3(0.059, 0.061, 0.039), vec3(0.059, 0.035, 0.044), clamp(0.5 + p.y * 0.15 + p.x * 0.02, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.77 + 0.13 * vec2(sin((time * 0.83) * 1.68 + hc.x * 6.2831853), cos((time * 0.83) * 1.18 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.14, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(5.027, 6.148, 7.269) + fi * 1.71 + (time * 0.83) * 1.05)) * (0.024 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.003, 0.961, 1.003);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
