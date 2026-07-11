uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p += vec2(sin((time * 0.53) * 0.87), cos((time * 0.53) * 0.55)) * 0.19;
	p *= 1.59;
	p = rot2((time * 0.53) * 0.37) * p;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.15 * sin((time * 0.53) * 0.80), -0.02 + 0.26 * cos((time * 0.53) * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.85);
	float cc = clamp(0.5 + 0.5 * (v * 2.36), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.16, 0.12), vec3(0.70, 0.73, 0.70), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.53)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 1.020, 0.990) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
