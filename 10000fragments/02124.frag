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
    float petal = 0.54 + 0.23 * cos(sa * 3 + t * 2.45 + ph);
    v = sin((sr - petal) * 8.42);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.96, t * 2.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.31) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.01 + time * 0.13, vec3(0.40, 0.51, 0.53), vec3(0.32, 0.32, 0.33), vec3(1.14, 0.89, 0.82), vec3(0.25, 0.47, 0.63));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
