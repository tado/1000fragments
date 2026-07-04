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
	vec2 c = vec2(-0.60 + 0.09 * sin(time * 1.35), 0.11 + 0.23 * cos(time * 0.61));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.48);
	vec3 col = palette(v * 1.88 * 0.77 + time * 0.00, vec3(0.41, 0.45, 0.43), vec3(0.48, 0.31, 0.44), vec3(1.08, 1.40, 1.29), vec3(0.41, 0.78, 0.55));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
