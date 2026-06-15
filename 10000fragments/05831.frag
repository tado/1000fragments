uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.19 + sin(p.y * 3.26 + t * 2.96) * 3.97 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.18 * cos(sa * 4 + t * 0.91 + ph);
    v = sin((sr - petal) * 17.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.45) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = d1 * d2;
	vec3 col = palette(d * 0.98 + time * 0.14, vec3(0.56, 0.60, 0.48), vec3(0.41, 0.32, 0.50), vec3(0.75, 1.21, 1.12), vec3(0.37, 0.98, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
