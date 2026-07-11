uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.06 * sin(time * 1.50), 0.28 + 0.17 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.02, 0.23)));
	}
	float v = exp(-trap * 2.77);
	vec3 col = palette(v * 2.81 * 1.50 + time * 0.27, vec3(0.43, 0.47, 0.43), vec3(0.30, 0.32, 0.46), vec3(0.82, 0.91, 1.29), vec3(0.84, 0.85, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
