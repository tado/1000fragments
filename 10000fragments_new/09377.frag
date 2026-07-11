uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	vec2 z = p;
	vec2 c = vec2(0.09 + 0.27 * sin(time * 0.76), 0.22 + 0.28 * cos(time * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.08);
	vec3 col = palette(v * 3.84 * 1.35 + time * 0.38, vec3(0.53, 0.55, 0.57), vec3(0.38, 0.49, 0.37), vec3(1.21, 0.88, 0.76), vec3(0.22, 0.74, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
