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
    float petal = 0.62 + 0.17 * cos(sa * 7 + t * 0.70 + ph);
    v = sin((sr - petal) * 6.75);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	p = rot2(2.49) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.16, vec3(0.44, 0.51, 0.58), vec3(0.49, 0.39, 0.48), vec3(0.79, 1.13, 0.97), vec3(0.69, 0.30, 0.10));
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
