uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.06 * sin(time * 1.65), 0.27 + 0.21 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.12);
	vec3 col = palette(v * 2.09 * 1.49 + time * 0.08, vec3(0.47, 0.49, 0.56), vec3(0.31, 0.31, 0.41), vec3(1.39, 0.82, 1.22), vec3(0.37, 0.24, 0.56));
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
