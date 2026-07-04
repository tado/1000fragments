uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.10 * sin(time * 1.09), -0.31 + 0.28 * cos(time * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.42, 0.23)));
	}
	float v = exp(-trap * 3.34);
	vec3 col = palette(v * 2.93 * 0.93 + time * 0.05, vec3(0.47, 0.56, 0.56), vec3(0.31, 0.40, 0.37), vec3(1.16, 0.89, 0.80), vec3(0.53, 0.37, 0.19));
	col = mod(col * 2.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
