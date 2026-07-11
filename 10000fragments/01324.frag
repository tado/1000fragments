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
    float petal = 0.45 + 0.23 * cos(sa * 9 + t * 1.61 + ph);
    v = sin((sr - petal) * 13.74);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.30 + t * 2.70 + ph) + sin(p.y * 8.41 - t * 2.70 + ph)
        + sin((p.x + p.y) * 2.64 + t * 2.70 + ph) + sin(length(p) * 8.07 - t * 2.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.67, 0.49) * sin(length(p) * 4.49 - time * 1.23) * 0.28;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(2.23) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.61 + time * 0.03, vec3(0.43, 0.50, 0.53), vec3(0.33, 0.41, 0.47), vec3(1.35, 0.81, 1.12), vec3(0.13, 0.12, 0.25));
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
