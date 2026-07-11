uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * -1.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.27 * sin(time * 1.26), -0.22 + 0.20 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.37, -0.25)));
	}
	float v = exp(-trap * 4.66);
	vec3 col = palette(v * 1.58 * 0.69 + time * 0.33, vec3(0.56, 0.57, 0.53), vec3(0.48, 0.44, 0.37), vec3(0.84, 0.87, 0.78), vec3(0.89, 0.36, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
