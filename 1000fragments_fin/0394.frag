uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p *= 2.39;
	vec3 col = vec3(0.039, 0.014, 0.039);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.97 + (time * 0.88) * 1.74), sin(fi * 0.97 + (time * 0.88) * 1.74)) * (0.77 + 0.39 * sin(fi * 1.7 + (time * 0.88) * 0.84));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(3.104, 3.960, 4.817) + fi * 1.11 + (time * 0.88) * 0.95)) * (0.025 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.939, 0.994, 1.057);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
