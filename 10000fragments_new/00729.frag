uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.10 * sin(time * 1.22), -0.00 + 0.09 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.77);
	vec3 col = palette(v * 2.75 * 0.54 + time * 0.09, vec3(0.54, 0.51, 0.59), vec3(0.45, 0.32, 0.46), vec3(0.94, 0.70, 0.78), vec3(0.56, 0.27, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
