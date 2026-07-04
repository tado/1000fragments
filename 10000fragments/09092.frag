uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.26 * sin(time * 1.13), 0.09 + 0.14 * cos(time * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.31, 0.37)));
	}
	float v = exp(-trap * 3.38);
	vec3 col = vec3(0.18, 0.87, 0.16) * (0.09 / (abs(v * 2.26) + 0.05));
	col = col / (1.0 + col);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 1.37 + time * 15.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
