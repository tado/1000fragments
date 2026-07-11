uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.71) * 0.67) * p;
	vec3 col = vec3(0.004, 0.036, 0.070);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.41 + (time * 0.71) * 1.77), sin(fi * 1.41 + (time * 0.71) * 1.77)) * (0.66 + 0.33 * sin(fi * 1.7 + (time * 0.71) * 1.88));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.15) + fi * 0.82 + (time * 0.71) * 1.17)) * (0.017 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.910, 0.985, 1.049) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
