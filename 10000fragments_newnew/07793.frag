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
    v = sin(sa * 4.76 + sr * 17.75 - t * 2.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.02 + t * 5.34 + ph) + sin(p.y * 12.99 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	p = rot2(2.59) * p;
	p = abs(p) - 0.49;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.19, vec3(0.44, 0.46, 0.51), vec3(0.48, 0.47, 0.44), vec3(1.30, 1.29, 1.40), vec3(0.14, 0.30, 0.34));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.38 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
