uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec2 z = p;
	vec2 c = vec2(-0.17 + 0.11 * sin(time * 0.73), -0.18 + 0.22 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.21, -0.07)));
	}
	float v = exp(-trap * 4.60);
	vec3 col = palette(v * 3.28 * 1.50 + time * 0.20, vec3(0.45, 0.50, 0.41), vec3(0.48, 0.44, 0.36), vec3(1.09, 1.21, 1.21), vec3(0.85, 0.04, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
