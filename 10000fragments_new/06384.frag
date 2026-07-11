uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	p = rot2(time * -0.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.23 * sin(time * 1.23), 0.49 + 0.08 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.32, -0.35)));
	}
	float v = exp(-trap * 3.90);
	vec3 col = palette(v * 2.80 * 1.34 + time * 0.07, vec3(0.51, 0.49, 0.45), vec3(0.49, 0.37, 0.49), vec3(0.97, 1.39, 0.96), vec3(0.91, 0.78, 0.06));
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
