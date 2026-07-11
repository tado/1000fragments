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
    v = sin(sa * 7.83 + sr * 15.00 - t * 2.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.01;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.96) * p * 10.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.74 + time * 0.29, vec3(0.47, 0.47, 0.43), vec3(0.45, 0.36, 0.40), vec3(0.73, 1.22, 1.07), vec3(0.57, 0.94, 0.59)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
