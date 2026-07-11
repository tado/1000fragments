uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.25 * sin(time * 1.54), -0.36 + 0.13 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.74);
	vec3 col = palette(v * 3.69 * 0.77 + time * 0.18, vec3(0.59, 0.57, 0.58), vec3(0.37, 0.47, 0.37), vec3(1.38, 0.91, 1.14), vec3(0.02, 0.54, 0.18));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
