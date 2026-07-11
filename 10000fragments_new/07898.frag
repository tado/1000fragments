uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * 0.93) * p;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.27 * sin(time * 1.41), 0.06 + 0.15 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.37);
	float cc = clamp(0.5 + 0.5 * v * 2.76, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.01, 0.22), vec3(0.78, 0.87, 0.46), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
