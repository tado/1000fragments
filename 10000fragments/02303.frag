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
    float petal = 0.45 + 0.23 * cos(sa * 7 + t * 2.50 + ph);
    v = sin((sr - petal) * 14.71);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.17 + sin(p.y * 2.76 + t * 4.77) * 3.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.30;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(1.40) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = d1 + d2;
	vec3 col = palette(d * 0.76 + time * 0.11, vec3(0.45, 0.52, 0.49), vec3(0.43, 0.31, 0.48), vec3(1.03, 1.21, 1.18), vec3(0.47, 0.36, 0.58));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
