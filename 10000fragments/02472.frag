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
    float petal = 0.56 + 0.27 * cos(sa * 3 + t * 1.77 + ph);
    v = sin((sr - petal) * 13.62);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.29 * cos(sa * 7 + t * 2.19 + ph);
    v = sin((sr - petal) * 6.21);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.81) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.49);
	float d = d1 * d2;
	vec3 col = palette(d * 1.66 + time * 0.14, vec3(0.41, 0.48, 0.44), vec3(0.47, 0.40, 0.50), vec3(1.22, 0.92, 0.98), vec3(0.70, 0.18, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
