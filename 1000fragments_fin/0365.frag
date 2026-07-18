uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.59) * 0.63), cos((time * 0.59) * 1.15)) * 0.05;
	p = rot2((time * 0.59) * 0.78) * p;
	vec3 col = mix(vec3(0.029, 0.062, 0.083), vec3(0.032, 0.057, 0.091), clamp(0.5 + p.y * 0.50 + p.x * 0.11, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.59) * 0.69 * (0.3 + fi * 0.17) + fi * 2.4), cos((time * 0.59) * 0.70 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.77;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(4.810, 6.289, 7.768) + fi * 0.82 + (time * 0.59) * 0.62)) * (0.035 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.943, 0.988, 1.038);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
