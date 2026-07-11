uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	p = rot2(time * -1.20) * p;
	vec3 col = vec3(0.049, 0.056, 0.016);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.99 + time * 0.77), sin(fi * 0.99 + time * 0.77)) * (0.58 + 0.23 * sin(fi * 1.7 + time * 1.32));
		vec2 bq = abs(p - q) - vec2(0.06, 0.14);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.04 + time * 0.89)) * (0.031 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
