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
    float petal = 0.69 + 0.13 * cos(sa * 7 + t * 0.50 + ph);
    v = sin((sr - petal) * 14.01);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	p = rot2(time * 0.86) * p;
	p += vec2(0.63, -0.67) * sin(length(p) * 4.22 - time * 0.84) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.16, vec3(0.48, 0.47, 0.41), vec3(0.45, 0.44, 0.44), vec3(1.34, 1.13, 1.05), vec3(0.98, 0.04, 0.74));
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
