uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = rot2(time * 0.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.06 * sin(time * 0.87), -0.09 + 0.27 * cos(time * 1.32));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.17);
	float cc = clamp(0.5 + 0.5 * v * 3.19, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.16, 0.30), vec3(0.96, 0.93, 0.56), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
