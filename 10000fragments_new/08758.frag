uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.22 * sin(time * 0.94), -0.34 + 0.19 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.19);
	float cc = clamp(0.5 + 0.5 * v * 2.66, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.39, 0.52), vec3(0.75, 0.61, 0.67), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
