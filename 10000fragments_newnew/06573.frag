uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.49 + t * 0.43) - 0.5) * 2.0;
    v = sin((p.y * 2.23 + zx * 0.80 + t * 1.90) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.69) * p * 21.67;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 0.83 + time * 0.19, vec3(0.47, 0.45, 0.49), vec3(0.46, 0.38, 0.39), vec3(1.19, 1.09, 1.07), vec3(0.35, 0.51, 0.93)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
