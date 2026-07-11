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
    float petal = 0.59 + 0.21 * cos(sa * 9 + t * 2.79 + ph);
    v = sin((sr - petal) * 14.46);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.83 + t * 2.67 + ph) + sin(p.y * 13.11 - t * 2.67 + ph)
        + sin((p.x + p.y) * 4.21 + t * 2.67 + ph) + sin(length(p) * 17.78 - t * 2.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	p = rot2(1.26) * p;
	p = abs(p) - 0.52;
	p = rot2(time * -0.31) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.18, vec3(0.58, 0.50, 0.51), vec3(0.50, 0.48, 0.45), vec3(0.71, 0.74, 0.82), vec3(0.73, 0.86, 0.02));
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
