uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	p = rot2(time * 0.58) * p;
	vec3 col = vec3(0.020, 0.020, 0.031);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.70 + time * 1.76), sin(fi * 0.70 + time * 1.76)) * (0.31 + 0.34 * sin(fi * 1.7 + time * 1.87));
		vec2 bq = abs(p - q) - vec2(0.14, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.42 + time * 0.80)) * (0.030 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
