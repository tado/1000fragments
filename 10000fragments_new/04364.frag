uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.09 * sin(time * 0.95), -0.44 + 0.05 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.29, 0.46)));
	}
	float v = exp(-trap * 4.40);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.80 * 3.38 + time * 0.71);
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
