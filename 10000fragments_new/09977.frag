uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.23 * sin(time * 0.68), 0.07 + 0.22 * cos(time * 0.95));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.07, -0.42)));
	}
	float v = exp(-trap * 3.47);
	vec3 col = palette(v * 3.92 * 0.67 + time * 0.33, vec3(0.55, 0.48, 0.40), vec3(0.39, 0.48, 0.42), vec3(0.90, 1.23, 0.81), vec3(0.20, 0.33, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
