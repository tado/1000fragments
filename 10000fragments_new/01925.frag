uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.20 * sin(time * 1.53), 0.43 + 0.22 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, 0.47)));
	}
	float v = exp(-trap * 5.23);
	vec3 col = palette(v * 2.93 * 0.92 + time * 0.02, vec3(0.46, 0.42, 0.47), vec3(0.33, 0.34, 0.42), vec3(0.97, 1.10, 0.91), vec3(0.65, 0.52, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
