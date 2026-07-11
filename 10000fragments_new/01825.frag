uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.13 * sin(time * 1.82), 0.09 + 0.07 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.63);
	vec3 col = palette(v * 3.53 * 0.45 + time * 0.38, vec3(0.47, 0.53, 0.52), vec3(0.41, 0.31, 0.46), vec3(0.99, 1.27, 0.85), vec3(0.43, 0.33, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
