uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(0.26 + 0.07 * sin(time * 1.27), -0.08 + 0.06 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.02);
	float cc = clamp(0.5 + 0.5 * v * 3.33, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.27, 0.39), vec3(0.92, 0.82, 0.53), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
