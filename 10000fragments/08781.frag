uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.24 * sin(time * 1.95), -0.05 + 0.06 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.62);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.91 * 3.59 + time * 0.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
