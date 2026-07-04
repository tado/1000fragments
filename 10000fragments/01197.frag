uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.09 * sin(time * 1.02), 0.47 + 0.18 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.95);
	vec3 col = palette(v * 1.56 * 1.42 + time * 0.35, vec3(0.54, 0.56, 0.46), vec3(0.47, 0.42, 0.32), vec3(1.15, 1.12, 0.72), vec3(0.98, 0.29, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
