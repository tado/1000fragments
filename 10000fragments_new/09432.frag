uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.55 + 0.27 * sin(time * 1.63), -0.27 + 0.30 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.76);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.70 * 2.68 + time * 0.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
