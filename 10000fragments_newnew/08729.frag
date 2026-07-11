uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(0.09 + 0.24 * sin(time * 0.64), 0.42 + 0.25 * cos(time * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.30, 0.07)));
	}
	float v = exp(-trap * 5.36);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.38 * 1.55 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
