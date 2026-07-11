uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.13 * sin(time * 0.58), 0.08 + 0.19 * cos(time * 1.06));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.75);
	vec3 col = palette(v * 2.83 * 1.13 + time * 0.35, vec3(0.50, 0.49, 0.43), vec3(0.45, 0.41, 0.46), vec3(0.75, 1.05, 0.78), vec3(0.78, 0.22, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
