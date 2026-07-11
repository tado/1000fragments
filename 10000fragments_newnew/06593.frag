uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * 0.68) * p;
	vec2 z = p;
	vec2 c = vec2(-0.63 + 0.25 * sin(time * 1.09), -0.43 + 0.05 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.34, -0.30)));
	}
	float v = exp(-trap * 2.79);
	vec3 col = palette(v * 3.26 * 0.67 + time * 0.02, vec3(0.57, 0.59, 0.53), vec3(0.43, 0.32, 0.37), vec3(1.24, 0.88, 1.36), vec3(0.44, 0.08, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
