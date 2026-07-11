uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.11 * sin(time * 1.55), 0.55 + 0.05 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.66);
	vec3 col = palette(v * 2.57 * 1.22 + time * 0.15, vec3(0.59, 0.56, 0.52), vec3(0.34, 0.33, 0.43), vec3(1.11, 1.17, 0.82), vec3(0.50, 0.08, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
