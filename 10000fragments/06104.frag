uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.44 + sr * 13.41 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.92) * p * 17.48;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 0.81 + time * 0.20, vec3(0.59, 0.47, 0.48), vec3(0.45, 0.44, 0.32), vec3(1.24, 1.24, 1.18), vec3(0.29, 0.67, 0.77)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
