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
	vec2 c = vec2(-0.01 + 0.16 * sin(time * 1.55), 0.52 + 0.22 * cos(time * 1.02));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.29);
	vec3 col = palette(v * 2.71 * 1.01 + time * 0.39, vec3(0.43, 0.46, 0.46), vec3(0.39, 0.38, 0.41), vec3(0.97, 1.27, 0.75), vec3(0.47, 0.21, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
