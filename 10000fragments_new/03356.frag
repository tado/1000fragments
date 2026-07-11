uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.80) * p;
	vec3 col = vec3(0.059, 0.014, 0.003);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.21 + time * 2.47), sin(fi * 1.21 + time * 2.47)) * (0.72 + 0.37 * sin(fi * 1.7 + time * 0.66));
		vec2 bq = abs(p - q) - vec2(0.09, 0.25);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.65 + time * 0.62)) * (0.035 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
