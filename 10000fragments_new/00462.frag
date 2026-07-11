uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(0.14 + 0.12 * sin(time * 1.37), 0.51 + 0.09 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.32, 0.06)));
	}
	float v = exp(-trap * 2.53);
	vec3 col = palette(v * 1.78 * 1.49 + time * 0.28, vec3(0.54, 0.59, 0.47), vec3(0.39, 0.43, 0.46), vec3(0.92, 1.29, 1.28), vec3(0.90, 0.20, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
