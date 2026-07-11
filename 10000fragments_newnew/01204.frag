uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec2 z = p;
	vec2 c = vec2(-0.47 + 0.21 * sin(time * 1.68), 0.45 + 0.25 * cos(time * 1.25));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.46);
	vec3 col = palette(v * 3.28 * 0.63 + time * 0.05, vec3(0.57, 0.54, 0.45), vec3(0.32, 0.44, 0.39), vec3(1.00, 0.96, 0.96), vec3(0.79, 0.39, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
