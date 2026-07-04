uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.26 * sin(time * 0.56), 0.14 + 0.11 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.77);
	vec3 col = palette(v * 1.69 * 0.65 + time * 0.11, vec3(0.52, 0.41, 0.46), vec3(0.33, 0.45, 0.37), vec3(1.17, 1.37, 1.28), vec3(0.70, 0.35, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
