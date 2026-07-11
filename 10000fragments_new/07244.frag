uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 z = p;
	vec2 c = vec2(-0.23 + 0.14 * sin(time * 1.61), 0.45 + 0.05 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.26, -0.22)));
	}
	float v = exp(-trap * 5.98);
	vec3 col = palette(v * 2.64 * 0.99 + time * 0.08, vec3(0.50, 0.52, 0.53), vec3(0.38, 0.40, 0.30), vec3(0.96, 0.86, 0.73), vec3(0.19, 0.62, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
