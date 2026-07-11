uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.29 * sin(time * 1.97), -0.29 + 0.25 * cos(time * 1.48));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.19);
	vec3 col = palette(v * 2.86 * 0.94 + time * 0.39, vec3(0.59, 0.53, 0.44), vec3(0.34, 0.41, 0.33), vec3(0.72, 1.29, 1.11), vec3(0.69, 0.60, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
