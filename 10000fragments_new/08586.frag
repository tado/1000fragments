uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.30 * sin(time * 1.69), -0.07 + 0.24 * cos(time * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.10);
	vec3 col = palette(v * 2.31 * 1.07 + time * 0.34, vec3(0.51, 0.45, 0.52), vec3(0.40, 0.39, 0.31), vec3(1.03, 1.39, 0.76), vec3(0.49, 0.23, 0.54));
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
