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
	vec2 c = vec2(-0.05 + 0.29 * sin(time * 0.57), 0.10 + 0.20 * cos(time * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.19);
	vec3 col = palette(v * 3.61 * 0.87 + time * 0.25, vec3(0.42, 0.50, 0.58), vec3(0.37, 0.40, 0.38), vec3(1.10, 0.97, 0.77), vec3(0.02, 0.89, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
