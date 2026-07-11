uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2(time * -1.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.11 * sin(time * 1.64), -0.55 + 0.08 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.01);
	float cc = clamp(0.5 + 0.5 * v * 2.05, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.28, 0.08), vec3(0.62, 0.73, 0.89), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
