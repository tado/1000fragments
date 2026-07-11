uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.15 * sin(time * 1.10), -0.47 + 0.12 * cos(time * 0.80));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.87);
	vec3 col = palette(v * 3.49 * 0.89 + time * 0.26, vec3(0.60, 0.45, 0.56), vec3(0.32, 0.36, 0.47), vec3(1.34, 1.02, 0.93), vec3(0.72, 0.43, 0.37));
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
