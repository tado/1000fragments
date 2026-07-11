uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.25 * sin(time * 0.85), -0.23 + 0.14 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.29);
	vec3 col = palette(v * 2.07 * 1.43 + time * 0.12, vec3(0.44, 0.42, 0.53), vec3(0.33, 0.32, 0.44), vec3(0.82, 0.91, 1.09), vec3(0.57, 0.68, 0.02));
	col = mod(col * 1.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
