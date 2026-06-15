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
    v = sin(sa * 5.56 + sr * 7.81 - t * 4.46 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.17 * cos(sa * 6 + t * 1.09 + ph);
    v = sin((sr - petal) * 8.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.64 + time * 0.60) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.32);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.93 + time * 0.02, vec3(0.48, 0.53, 0.47), vec3(0.31, 0.38, 0.32), vec3(1.26, 1.11, 0.95), vec3(0.20, 0.68, 0.06));
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
