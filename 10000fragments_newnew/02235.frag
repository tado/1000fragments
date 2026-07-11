uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.22 * sin(time * 0.52), 0.05 + 0.26 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.69);
	vec3 col = palette(v * 3.16 * 1.31 + time * 0.10, vec3(0.58, 0.45, 0.49), vec3(0.34, 0.40, 0.40), vec3(1.24, 0.85, 1.04), vec3(0.28, 0.29, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
