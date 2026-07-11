uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.30) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.25;
	p *= 0.83;
	float d = 0.5 + 0.5 * field(p, (time * 0.54), 0.0);
	vec2 hq = rot2(1.26) * p * 16.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.68 + (time * 0.54) * 0.19, vec3(0.42, 0.46, 0.45), vec3(0.18, 0.16, 0.14), vec3(0.41, 0.72, 0.85), vec3(0.08, 0.52, 0.12)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.041, 1.006, 0.928) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
