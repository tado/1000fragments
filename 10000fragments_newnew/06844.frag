uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 z = p;
	vec2 c = vec2(-0.18 + 0.08 * sin(time * 1.90), 0.38 + 0.21 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.94);
	vec3 col = palette(v * 1.68 * 0.53 + time * 0.01, vec3(0.52, 0.53, 0.52), vec3(0.30, 0.48, 0.48), vec3(0.97, 0.82, 0.89), vec3(0.62, 0.83, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
