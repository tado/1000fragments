uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.16 * sin(time * 1.14), -0.01 + 0.30 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.62);
	vec3 col = palette(v * 1.99 * 1.20 + time * 0.40, vec3(0.51, 0.45, 0.56), vec3(0.44, 0.33, 0.41), vec3(1.19, 1.28, 1.22), vec3(0.50, 0.35, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
