uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.25 * sin(time * 0.73), -0.37 + 0.22 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.57);
	float cc = clamp(0.5 + 0.5 * v * 3.46, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.35, 0.41), vec3(0.61, 0.61, 0.41), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
