uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.25 * sin(time * 1.13), -0.31 + 0.10 * cos(time * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.53);
	vec3 col = palette(v * 2.38 * 0.66 + time * 0.32, vec3(0.51, 0.41, 0.59), vec3(0.31, 0.32, 0.50), vec3(1.11, 0.81, 0.89), vec3(0.51, 0.59, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
