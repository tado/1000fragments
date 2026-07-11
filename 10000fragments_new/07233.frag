uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.12 * sin(time * 1.53), -0.49 + 0.28 * cos(time * 1.04));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.41, -0.16)));
	}
	float v = exp(-trap * 4.25);
	vec3 col = palette(v * 3.86 * 0.68 + time * 0.40, vec3(0.51, 0.55, 0.45), vec3(0.47, 0.43, 0.39), vec3(1.16, 1.34, 1.31), vec3(0.42, 0.73, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
