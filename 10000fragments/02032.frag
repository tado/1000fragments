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
    v = sin(sa * 6.71 + sr * 23.32 - t * 3.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.51 + t * 1.28 + ph) + sin(p.y * 9.23 - t * 5.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.83) - 0.5;
	p *= 1.20;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.24; p = rot2(0.68) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.03, vec3(0.56, 0.56, 0.57), vec3(0.50, 0.42, 0.38), vec3(1.18, 0.94, 0.78), vec3(0.39, 0.59, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
