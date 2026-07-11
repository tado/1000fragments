uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	p = rot2(time * -0.35) * p;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.17 * sin(time * 1.76), 0.54 + 0.20 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.03, 0.33)));
	}
	float v = exp(-trap * 1.58);
	float cc = clamp(0.5 + 0.5 * v * 3.29, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.14, 0.45), vec3(0.96, 0.79, 0.69), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
