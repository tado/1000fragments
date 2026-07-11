uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.06 * sin(time * 0.93), -0.01 + 0.16 * cos(time * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.14, -0.20)));
	}
	float v = exp(-trap * 1.65);
	vec3 col = palette(v * 3.38 * 0.99 + time * 0.27, vec3(0.56, 0.59, 0.58), vec3(0.47, 0.39, 0.31), vec3(1.17, 0.88, 1.21), vec3(0.62, 0.62, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
