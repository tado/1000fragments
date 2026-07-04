uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.28 * sin(time * 0.86), 0.18 + 0.27 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.72);
	vec3 col = palette(v * 2.27 * 1.23 + time * 0.13, vec3(0.52, 0.51, 0.49), vec3(0.42, 0.45, 0.46), vec3(1.20, 1.10, 1.01), vec3(0.16, 0.03, 0.94));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
