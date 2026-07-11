uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.21 * sin(time * 0.90), 0.60 + 0.06 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.94);
	vec3 col = palette(v * 3.29 * 1.02 + time * 0.28, vec3(0.58, 0.43, 0.52), vec3(0.45, 0.35, 0.48), vec3(0.82, 0.85, 1.07), vec3(0.81, 0.74, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
