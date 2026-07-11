uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.14 * sin((time * 0.51) * 0.96), 0.44 + 0.29 * cos((time * 0.51) * 1.49));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.44, -0.39)));
	}
	float v = exp(-trap * 1.61);
	vec3 col = palette((v * 2.19) * 0.88 + (time * 0.51) * 0.04, vec3(0.39, 0.35, 0.40), vec3(0.15, 0.12, 0.12), vec3(0.77, 0.54, 0.52), vec3(0.98, 0.27, 0.27));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.976, 0.912) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
