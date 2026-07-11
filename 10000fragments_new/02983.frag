uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.07 * sin(time * 1.17), 0.14 + 0.22 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.38);
	vec3 col = palette(v * 3.70 * 1.47 + time * 0.10, vec3(0.59, 0.50, 0.42), vec3(0.41, 0.36, 0.50), vec3(1.19, 1.26, 0.83), vec3(0.56, 0.30, 0.02));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
