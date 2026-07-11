uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.06 * sin(time * 1.76), 0.17 + 0.07 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.43, 0.36)));
	}
	float v = exp(-trap * 3.84);
	vec3 col = palette(v * 2.05 * 1.03 + time * 0.16, vec3(0.51, 0.59, 0.45), vec3(0.35, 0.32, 0.38), vec3(0.93, 0.79, 1.29), vec3(0.51, 0.50, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
