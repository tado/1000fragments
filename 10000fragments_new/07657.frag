uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec2 z = p;
	vec2 c = vec2(0.24 + 0.22 * sin(time * 1.99), 0.19 + 0.24 * cos(time * 0.44));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.63);
	vec3 col = palette(v * 3.32 * 0.71 + time * 0.02, vec3(0.52, 0.56, 0.56), vec3(0.41, 0.41, 0.42), vec3(1.20, 0.87, 0.93), vec3(0.66, 0.64, 0.49));
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
