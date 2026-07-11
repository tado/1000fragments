uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.67) * 1.13), cos((time * 0.67) * 0.40)) * 0.08;
	p.x += p.y * 0.53;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec3 col = vec3(0.029, 0.005, 0.021);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.67) * 0.46 * (0.3 + fi * 0.21) + fi * 2.4), cos((time * 0.67) * 1.45 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.85;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.85, 1.70) + fi * 0.59 + (time * 0.67) * 0.98)) * (0.010 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.67)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.988, 1.026) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
