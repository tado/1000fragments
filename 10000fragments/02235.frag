uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.07 - t * 6.14 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.14 + sr * 21.01 - t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = rot2(time * -1.01) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.86 + time * 0.22, vec3(0.41, 0.55, 0.58), vec3(0.45, 0.44, 0.39), vec3(1.06, 1.00, 1.30), vec3(0.29, 0.37, 0.14));
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
