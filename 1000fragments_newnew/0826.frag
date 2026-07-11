uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2((time * 0.77) * 0.78) * p;
	vec3 col = vec3(0.002, 0.038, 0.015);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.04 + (time * 0.77) * 2.32), sin(fi * 1.04 + (time * 0.77) * 2.32)) * (0.43 + 0.29 * sin(fi * 1.7 + (time * 0.77) * 0.52));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.29) + fi * 0.42 + (time * 0.77) * 1.47)) * (0.023 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.77)) * 100.0) - 0.5) * 0.04;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 0.981, 0.990) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
