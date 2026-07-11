uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.28 * sin(time * 0.69), 0.37 + 0.30 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.18);
	vec3 col = vec3(0.61, 0.79, 0.19) * (0.14 / (abs(v * 3.86) + 0.03));
	col = col / (1.0 + col);
	col = mod(col * 2.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
