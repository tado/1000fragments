uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.19 * sin(time * 0.69), 0.20 + 0.20 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.39);
	float cc = clamp(0.5 + 0.5 * v * 3.48, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.34, 0.53), vec3(0.57, 0.78, 0.66), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
