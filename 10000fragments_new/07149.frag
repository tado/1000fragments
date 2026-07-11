uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.12 * sin(time * 1.80), 0.14 + 0.28 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.40);
	vec3 col = palette(v * 1.82 * 1.07 + time * 0.19, vec3(0.46, 0.52, 0.42), vec3(0.45, 0.36, 0.40), vec3(1.30, 0.89, 1.24), vec3(0.18, 0.54, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
