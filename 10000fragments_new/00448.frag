uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.22 * sin(time * 0.95), 0.60 + 0.06 * cos(time * 1.02));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.00);
	vec3 col = palette(v * 3.85 * 0.64 + time * 0.23, vec3(0.52, 0.56, 0.52), vec3(0.43, 0.38, 0.46), vec3(0.75, 1.34, 1.22), vec3(0.46, 0.36, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
