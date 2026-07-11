uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.08 * sin(time * 1.30), -0.49 + 0.10 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.33);
	float cc = clamp(0.5 + 0.5 * v * 2.94, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.05, 0.16), vec3(0.76, 0.73, 0.41), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
