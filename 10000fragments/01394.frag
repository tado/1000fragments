uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.80, t * 1.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.14 + sr * 23.19 - t * 1.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(p.y * 2.65 + time * 0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.33 + time * 0.09, vec3(0.56, 0.58, 0.54), vec3(0.37, 0.48, 0.42), vec3(1.09, 1.28, 1.38), vec3(0.22, 0.40, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
