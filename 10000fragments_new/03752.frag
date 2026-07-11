uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.15 * sin(time * 0.68), -0.33 + 0.14 * cos(time * 0.41));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.12);
	vec3 col = palette(v * 2.86 * 0.97 + time * 0.28, vec3(0.47, 0.56, 0.51), vec3(0.31, 0.48, 0.42), vec3(1.06, 0.86, 0.74), vec3(0.62, 0.29, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
