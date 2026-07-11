uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.30 * sin(time * 1.60), 0.59 + 0.17 * cos(time * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.29);
	float cc = clamp(0.5 + 0.5 * v * 1.86, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.24, 0.20), vec3(0.94, 0.89, 0.53), cc);
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
