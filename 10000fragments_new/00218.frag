uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.06 * sin(time * 1.51), -0.04 + 0.21 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, 0.32)));
	}
	float v = exp(-trap * 4.33);
	vec3 col = palette(v * 3.83 * 0.63 + time * 0.20, vec3(0.41, 0.60, 0.56), vec3(0.41, 0.32, 0.33), vec3(1.14, 1.38, 1.05), vec3(0.88, 0.36, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
