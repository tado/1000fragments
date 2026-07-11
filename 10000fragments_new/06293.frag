uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.20 * sin(time * 1.96), 0.34 + 0.24 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.76);
	vec3 col = palette(v * 3.66 * 0.46 + time * 0.40, vec3(0.49, 0.41, 0.58), vec3(0.42, 0.39, 0.45), vec3(1.15, 0.90, 1.31), vec3(0.35, 0.63, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
