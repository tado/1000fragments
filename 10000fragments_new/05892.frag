uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.10 * sin(time * 0.67), 0.09 + 0.30 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.91);
	vec3 col = palette(v * 2.65 * 1.25 + time * 0.12, vec3(0.50, 0.47, 0.41), vec3(0.46, 0.31, 0.33), vec3(1.07, 0.90, 1.02), vec3(0.53, 0.86, 0.13));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.28 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
