uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.76 + t * 4.06 + ph) + sin(p.y * 13.44 - t * 3.84 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.20 * cos(sa * 4.0 + t * 1.41 + ph);
    v = sin((sr - petal) * 6.53);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.58; p = rot2(1.57) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.15 + time * 0.08, vec3(0.54, 0.46, 0.54), vec3(0.35, 0.35, 0.33), vec3(0.72, 0.99, 0.94), vec3(0.30, 0.38, 0.33));
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
