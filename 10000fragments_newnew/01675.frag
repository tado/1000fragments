uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 z = p;
	vec2 c = vec2(-0.63 + 0.24 * sin(time * 0.76), -0.16 + 0.29 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.60);
	vec3 col = palette(v * 3.46 * 0.41 + time * 0.06, vec3(0.60, 0.45, 0.60), vec3(0.35, 0.39, 0.38), vec3(1.01, 0.92, 0.97), vec3(0.72, 0.25, 0.96));
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
