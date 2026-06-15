uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.64 + t * 5.08 + ph) + sin(p.y * 7.71 - t * 1.34 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.88 + sr * 23.48 - t * 4.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p = rot2(0.50) * p;
	p = rot2(length(p) * 3.94 + time * 0.40) * p;
	p = rot2(time * -1.35) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = d1 + d2;
	vec3 col = palette(d * 0.61 + time * 0.10, vec3(0.56, 0.50, 0.56), vec3(0.32, 0.44, 0.44), vec3(0.76, 0.95, 1.31), vec3(0.37, 0.00, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
