uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.23 * sin(time * 1.33), -0.00 + 0.07 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.27, -0.00)));
	}
	float v = exp(-trap * 5.22);
	vec3 col = palette(v * 3.92 * 1.33 + time * 0.33, vec3(0.55, 0.55, 0.45), vec3(0.30, 0.37, 0.40), vec3(0.89, 1.25, 0.97), vec3(0.64, 0.57, 0.73));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
