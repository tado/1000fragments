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
    float petal = 0.68 + 0.16 * cos(sa * 9 + t * 2.64 + ph);
    v = sin((sr - petal) * 6.25);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	p = rot2(p.y * -3.99 + time * 0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.14, vec3(0.48, 0.60, 0.56), vec3(0.41, 0.42, 0.32), vec3(0.75, 1.18, 1.00), vec3(0.15, 0.24, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
