uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.18 * sin(time * 1.78), 0.02 + 0.30 * cos(time * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.70);
	vec3 col = palette(v * 2.24 * 1.15 + time * 0.21, vec3(0.51, 0.50, 0.41), vec3(0.49, 0.34, 0.35), vec3(0.94, 0.81, 0.93), vec3(0.29, 0.89, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
