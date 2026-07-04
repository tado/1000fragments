uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	vec2 z = p;
	vec2 c = vec2(-0.12 + 0.07 * sin(time * 0.80), -0.46 + 0.26 * cos(time * 1.50));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.20, 0.02)));
	}
	float v = exp(-trap * 3.03);
	vec3 col = palette(v * 3.39 * 0.41 + time * 0.22, vec3(0.53, 0.42, 0.56), vec3(0.44, 0.31, 0.40), vec3(1.08, 1.39, 1.21), vec3(0.60, 0.63, 0.03));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
