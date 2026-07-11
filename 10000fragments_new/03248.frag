uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	vec2 z = p;
	vec2 c = vec2(0.16 + 0.14 * sin(time * 1.73), 0.43 + 0.25 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.48);
	vec3 col = palette(v * 3.25 * 1.20 + time * 0.39, vec3(0.44, 0.45, 0.46), vec3(0.32, 0.41, 0.47), vec3(1.06, 1.04, 0.83), vec3(0.95, 0.04, 0.10));
	col *= 0.80 + 0.18 * sin(gl_FragCoord.y * 1.31 + time * 17.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
