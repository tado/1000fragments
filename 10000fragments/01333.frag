uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.98 + t * 4.24 + ph) + sin(p.y * 6.72 - t * 4.24 + ph)
        + sin((p.x + p.y) * 9.16 + t * 4.24 + ph) + sin(length(p) * 16.47 - t * 4.24 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.79 + sr * 16.11 - t * 2.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.17;
	p = rot2(length(p) * 3.14 + time * 0.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.62 + time * 0.18, vec3(0.50, 0.54, 0.53), vec3(0.47, 0.40, 0.48), vec3(0.93, 0.75, 0.80), vec3(0.14, 0.46, 0.80));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
