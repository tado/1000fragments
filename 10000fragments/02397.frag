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
    float petal = 0.60 + 0.22 * cos(sa * 5 + t * 0.87 + ph);
    v = sin((sr - petal) * 8.43);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.23) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.13, vec3(0.55, 0.49, 0.50), vec3(0.33, 0.42, 0.44), vec3(0.78, 1.06, 1.12), vec3(0.95, 0.80, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
