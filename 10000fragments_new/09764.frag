uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.06 * sin(time * 1.67), 0.39 + 0.10 * cos(time * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.47);
	vec3 col = palette(v * 3.98 * 0.91 + time * 0.22, vec3(0.44, 0.52, 0.50), vec3(0.34, 0.35, 0.38), vec3(1.23, 0.97, 0.78), vec3(0.40, 0.13, 0.80));
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
