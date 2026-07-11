uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.14 * sin(time * 1.07), -0.54 + 0.11 * cos(time * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, -0.38)));
	}
	float v = exp(-trap * 5.87);
	vec3 col = palette(v * 2.29 * 1.28 + time * 0.13, vec3(0.43, 0.49, 0.59), vec3(0.50, 0.48, 0.33), vec3(1.16, 1.01, 1.33), vec3(0.01, 0.75, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
