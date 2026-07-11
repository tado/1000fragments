uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.09 * sin(time * 0.90), -0.54 + 0.19 * cos(time * 0.42));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.33);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.74 * 4.73 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
