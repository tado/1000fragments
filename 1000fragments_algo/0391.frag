uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.35 + (time * 0.57) * 1.03) * 0.06;
	p *= 2.09;
	p = rot2((time * 0.57) * -0.78) * p;
	vec3 col = vec3(0.048, 0.039, 0.056);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.57) * 0.70 * (0.3 + fi * 0.07) + fi * 2.4), cos((time * 0.57) * 0.51 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.60;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.14) + fi * 1.93 + (time * 0.57) * 1.40)) * (0.022 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.984, 0.945) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
