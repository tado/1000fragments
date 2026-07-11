uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.17 + t * 2.05 + ph) + sin(p.y * 6.11 - t * 2.05 + ph)
        + sin((p.x + p.y) * 3.59 + t * 2.05 + ph) + sin(length(p) * 14.77 - t * 2.05 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.67 + sr * 11.22 - t * 2.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	p = rot2(length(p) * 1.63 + time * 0.68) * p;
	p *= 2.60;
	p = rot2(2.76) * p;
	p = abs(p) - 0.80;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.88);
	float d = d1 * d2;
	vec3 col = palette(d * 1.41 + time * 0.11, vec3(0.46, 0.59, 0.54), vec3(0.36, 0.41, 0.40), vec3(1.33, 0.79, 1.00), vec3(0.12, 0.25, 0.68));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
