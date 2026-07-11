uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec2 z = p;
	vec2 c = vec2(0.09 + 0.06 * sin(time * 0.74), -0.56 + 0.21 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.24);
	vec3 col = palette(v * 4.00 * 1.29 + time * 0.29, vec3(0.58, 0.56, 0.50), vec3(0.40, 0.48, 0.47), vec3(1.11, 0.73, 1.36), vec3(0.00, 0.45, 0.65));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
