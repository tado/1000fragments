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
    v = sin(sa * 4.39 + sr * 7.60 - t * 1.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p = rot2(length(p) * 3.20 + time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.06, vec3(0.44, 0.46, 0.44), vec3(0.30, 0.44, 0.37), vec3(1.36, 1.10, 0.82), vec3(0.95, 0.14, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
