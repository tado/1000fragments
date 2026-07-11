uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p = rot2((time * 0.57) * -0.94) * p;
	vec3 col = vec3(0.014, 0.004, 0.048);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.85 + (time * 0.57) * 0.65), sin(fi * 0.85 + (time * 0.57) * 0.65)) * (0.38 + 0.19 * sin(fi * 1.7 + (time * 0.57) * 1.06));
		vec2 bq = abs(p - q) - vec2(0.20, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.14) + fi * 1.08 + (time * 0.57) * 0.34)) * (0.017 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.990, 1.043) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
