uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	p = rot2((time * 0.85) * 1.27) * p;
	vec2 z = p;
	vec2 c = vec2(-0.84 + 0.24 * sin((time * 0.85) * 1.27), -0.24 + 0.19 * cos((time * 0.85) * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.09);
	vec3 col = palette((v * 2.54) * 1.18 + (time * 0.85) * 0.23, vec3(0.28, 0.28, 0.21), vec3(0.21, 0.16, 0.18), vec3(0.77, 0.74, 0.58), vec3(0.19, 0.31, 0.61));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.85)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 1.015, 0.994) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
