uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.13 * sin(time * 1.16), 0.26 + 0.06 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.54);
	vec3 col = palette(v * 3.15 * 0.42 + time * 0.32, vec3(0.57, 0.55, 0.54), vec3(0.50, 0.39, 0.39), vec3(1.32, 1.39, 1.14), vec3(0.38, 0.65, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
