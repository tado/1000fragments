uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.82 + t * 5.95 + ph) + sin(p.y * 4.10 - t * 1.59 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.76 + sr * 5.14 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	p = rot2(0.89) * p;
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 2.84 - time * 0.16); }
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(1.61) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.88 + time * 0.18, vec3(0.48, 0.48, 0.56), vec3(0.49, 0.34, 0.49), vec3(0.87, 1.30, 0.97), vec3(0.59, 0.13, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
