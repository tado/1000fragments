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
    v = sin(sa * 6.56 + sr * 5.02 - t * 1.45 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.13 * cos(sa * 6 + t * 1.02 + ph);
    v = sin((sr - petal) * 16.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 3.48 + time * 0.32) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.52 + time * 0.02, vec3(0.46, 0.47, 0.40), vec3(0.39, 0.40, 0.35), vec3(1.32, 1.20, 1.23), vec3(0.35, 0.02, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
