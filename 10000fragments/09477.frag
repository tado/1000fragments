uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	p = rot2(time * 0.44) * p;
	vec3 col = vec3(0.050, 0.022, 0.071);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.32 + time * 1.82), sin(fi * 1.32 + time * 1.82)) * (0.52 + 0.21 * sin(fi * 1.7 + time * 0.78));
		vec2 bq = abs(p - q) - vec2(0.20, 0.14);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.41 + time * 1.03)) * (0.021 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
