uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	p = rot2(time * -1.43) * p;
	vec3 col = vec3(0.039, 0.049, 0.041);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.70 + time * 0.95), sin(fi * 1.70 + time * 0.95)) * (0.46 + 0.15 * sin(fi * 1.7 + time * 0.90));
		vec2 bq = abs(p - q) - vec2(0.11, 0.16);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.59 + time * 1.31)) * (0.009 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
