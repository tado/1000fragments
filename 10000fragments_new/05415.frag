uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.13 * sin(time * 0.86), -0.48 + 0.26 * cos(time * 0.63));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.22);
	vec3 col = palette(v * 1.98 * 1.34 + time * 0.03, vec3(0.57, 0.53, 0.57), vec3(0.48, 0.38, 0.38), vec3(1.01, 0.87, 0.76), vec3(0.22, 0.25, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
