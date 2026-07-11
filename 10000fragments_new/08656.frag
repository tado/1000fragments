uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec2 z = p;
	vec2 c = vec2(-0.17 + 0.18 * sin(time * 1.08), 0.03 + 0.10 * cos(time * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.04, -0.04)));
	}
	float v = exp(-trap * 5.10);
	vec3 col = palette(v * 2.76 * 1.33 + time * 0.18, vec3(0.42, 0.59, 0.47), vec3(0.50, 0.34, 0.47), vec3(1.19, 1.10, 0.79), vec3(0.77, 0.22, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
