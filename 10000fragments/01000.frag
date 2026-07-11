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
    v = sin(sa * 6.70 + sr * 5.73 - t * 1.23 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.94 + t * 3.68 + ph) + sin(p.y * 7.83 - t * 3.68 + ph)
        + sin((p.x + p.y) * 7.74 + t * 3.68 + ph) + sin(length(p) * 3.63 - t * 3.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = rot2(2.48) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.30, vec3(0.59, 0.51, 0.57), vec3(0.33, 0.46, 0.42), vec3(1.06, 1.01, 0.83), vec3(0.90, 0.76, 0.64));
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
