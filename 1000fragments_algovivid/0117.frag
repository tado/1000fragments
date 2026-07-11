uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.11 * cos(sa * 7.0 + t * 0.77 + ph);
    v = sin((sr - petal) * 13.97);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.53;
	p *= 2.21;
	p = rot2(1.51) * p;
	float d = field(p, (time * 0.66), 0.0);
	vec3 col = palette(d * 1.29 + (time * 0.66) * 0.23, vec3(0.38, 0.38, 0.38), vec3(0.15, 0.08, 0.16), vec3(0.81, 0.58, 0.68), vec3(0.06, 0.77, 0.99));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.975, 0.915) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
