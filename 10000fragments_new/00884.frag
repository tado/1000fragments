uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(-0.68 + 0.23 * sin(time * 0.64), 0.44 + 0.27 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.71);
	vec3 col = palette(v * 1.61 * 1.07 + time * 0.07, vec3(0.58, 0.47, 0.44), vec3(0.49, 0.40, 0.50), vec3(1.29, 1.20, 1.26), vec3(0.28, 0.99, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
