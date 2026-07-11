uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.28 * sin(time * 1.02), -0.59 + 0.20 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.13);
	vec3 col = palette(v * 1.97 * 1.13 + time * 0.17, vec3(0.51, 0.42, 0.40), vec3(0.32, 0.40, 0.36), vec3(1.34, 1.22, 0.91), vec3(0.57, 0.06, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
