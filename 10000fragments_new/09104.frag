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
	vec2 c = vec2(-0.36 + 0.10 * sin(time * 1.23), 0.39 + 0.08 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.35);
	vec3 col = palette(v * 3.91 * 0.99 + time * 0.22, vec3(0.42, 0.57, 0.56), vec3(0.46, 0.31, 0.44), vec3(0.94, 1.08, 1.25), vec3(0.59, 0.61, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
