uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	p = rot2(time * 0.73) * p;
	vec3 col = vec3(0.034, 0.031, 0.050);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.79 + time * 0.69), sin(fi * 0.79 + time * 0.69)) * (0.31 + 0.15 * sin(fi * 1.7 + time * 1.39));
		vec2 bq = abs(p - q) - vec2(0.22, 0.25);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.63 + time * 0.87)) * (0.012 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
