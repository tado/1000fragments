uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.14 * sin(time * 1.34), -0.20 + 0.22 * cos(time * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.08);
	vec3 col = palette(v * 2.65 * 0.81 + time * 0.04, vec3(0.55, 0.43, 0.51), vec3(0.42, 0.45, 0.32), vec3(0.89, 1.25, 0.76), vec3(0.20, 0.15, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
