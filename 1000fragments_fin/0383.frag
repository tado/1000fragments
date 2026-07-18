uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.88) * 1.05), cos((time * 0.88) * 1.05)) * 0.24;
	vec3 col = mix(vec3(0.026, 0.036, 0.073), vec3(0.012, 0.057, 0.090), clamp(0.5 + p.y * 0.41 + p.x * 0.01, 0.0, 1.0));
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.88) * 1.44 * (0.3 + fi * 0.09) + fi * 2.4), cos((time * 0.88) * 0.71 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.97;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(5.621, 7.299, 8.976) + fi * 0.61 + (time * 0.88) * 0.68)) * (0.008 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.010, 1.004, 1.010);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
