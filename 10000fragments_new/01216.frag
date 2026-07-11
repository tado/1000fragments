uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2(time * 1.58) * p;
	vec3 col = vec3(0.031, 0.044, 0.008);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.90 + time * 1.83), sin(fi * 0.90 + time * 1.83)) * (0.57 + 0.31 * sin(fi * 1.7 + time * 1.29));
		vec2 bq = abs(p - q) - vec2(0.21, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.59 + time * 0.27)) * (0.011 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
