uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p = rot2((time * 0.83) * 0.87) * p;
	vec3 col = mix(vec3(0.029, 0.070, 0.042), vec3(0.031, 0.088, 0.044), clamp(0.5 + p.y * -0.15 + p.x * 0.07, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.83 + (time * 0.83) * 0.75), sin(fi * 1.83 + (time * 0.83) * 0.75)) * (0.76 + 0.34 * sin(fi * 1.7 + (time * 0.83) * 1.68));
		vec2 bq = abs(p - q) - vec2(0.22, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.317, 1.186, 2.054) + fi * 1.86 + (time * 0.83) * 1.19)) * (0.032 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.011, 0.959, 0.995);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
