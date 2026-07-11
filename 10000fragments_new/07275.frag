uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(time * 0.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.60 + 0.29 * sin(time * 1.60), -0.31 + 0.20 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.86);
	float cc = clamp(0.5 + 0.5 * v * 2.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.30, 0.27), vec3(0.78, 0.70, 0.85), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
