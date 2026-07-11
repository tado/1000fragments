uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.23 * sin(time * 1.18), 0.03 + 0.07 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.67);
	vec3 col = palette(v * 3.96 * 0.66 + time * 0.10, vec3(0.59, 0.53, 0.49), vec3(0.39, 0.33, 0.39), vec3(0.77, 1.01, 0.74), vec3(0.49, 0.65, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
