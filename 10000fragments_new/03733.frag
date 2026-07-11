uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.24 * sin(time * 0.54), -0.11 + 0.19 * cos(time * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.08);
	vec3 col = palette(v * 3.07 * 0.89 + time * 0.06, vec3(0.52, 0.41, 0.48), vec3(0.37, 0.38, 0.48), vec3(0.94, 1.35, 0.96), vec3(0.94, 0.58, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
