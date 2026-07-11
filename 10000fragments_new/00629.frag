uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * 1.22) * p;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.18 * sin(time * 1.64), 0.51 + 0.21 * cos(time * 0.76));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.44, 0.29)));
	}
	float v = exp(-trap * 3.39);
	vec3 col = vec3(0.56, 0.34, 1.00) * (0.10 / (abs(v * 3.91) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
