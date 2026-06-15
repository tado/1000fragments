uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.66 + t * 2.28 + ph) + sin(p.y * 11.56 - t * 2.28 + ph)
        + sin((p.x + p.y) * 7.05 + t * 2.28 + ph) + sin(length(p) * 6.47 - t * 2.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.96 + sr * 22.74 - t * 3.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.55 + time * 0.16, vec3(0.59, 0.52, 0.58), vec3(0.44, 0.41, 0.38), vec3(0.83, 0.78, 1.06), vec3(0.34, 0.26, 0.84));
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
