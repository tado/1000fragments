uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.13 * sin(time * 0.76), -0.16 + 0.17 * cos(time * 1.51));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.29);
	vec3 col = palette(v * 3.95 * 1.46 + time * 0.27, vec3(0.50, 0.55, 0.40), vec3(0.42, 0.32, 0.47), vec3(1.06, 0.84, 1.17), vec3(0.10, 0.76, 0.35));
	col = fract(col * 1.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
