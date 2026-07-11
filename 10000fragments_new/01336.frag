uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.06 * sin(time * 1.80), 0.22 + 0.14 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.03, 0.38)));
	}
	float v = exp(-trap * 3.06);
	float cc = clamp(0.5 + 0.5 * v * 1.70, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.30, 0.19), vec3(0.56, 0.62, 0.63), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
