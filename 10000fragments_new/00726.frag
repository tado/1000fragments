uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	vec2 z = p;
	vec2 c = vec2(-0.52 + 0.20 * sin(time * 1.26), 0.31 + 0.13 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.44);
	vec3 col = palette(v * 2.03 * 1.22 + time * 0.26, vec3(0.45, 0.47, 0.45), vec3(0.44, 0.39, 0.41), vec3(0.83, 1.34, 1.31), vec3(0.01, 0.49, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
