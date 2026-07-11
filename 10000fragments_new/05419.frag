uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	vec2 z = p;
	vec2 c = vec2(-0.41 + 0.13 * sin(time * 1.25), -0.47 + 0.18 * cos(time * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.01);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.52 * 3.72 + time * 0.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
