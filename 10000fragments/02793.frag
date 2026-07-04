uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.09 * sin(time * 1.86), 0.24 + 0.22 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.84);
	vec3 col = palette(v * 3.98 * 0.83 + time * 0.18, vec3(0.54, 0.58, 0.50), vec3(0.36, 0.41, 0.32), vec3(1.22, 1.39, 1.30), vec3(0.34, 0.12, 0.95));
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
