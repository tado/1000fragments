uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.09 * sin(time * 1.75), 0.09 + 0.27 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.33, 0.17)));
	}
	float v = exp(-trap * 2.93);
	float cc = clamp(0.5 + 0.5 * v * 2.02, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.00, 0.36), vec3(0.74, 1.00, 0.91), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
