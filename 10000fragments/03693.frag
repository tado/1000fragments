uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = rot2(time * -1.28) * p;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.13 * sin(time * 1.20), -0.39 + 0.24 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.42, -0.20)));
	}
	float v = exp(-trap * 4.70);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.39 * 2.51 + time * 0.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
