uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.50 * sin(mf + 3.0) + ph), cos(t * 1.50 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.26 * cos(sa * 7 + t * 1.80 + ph);
    v = sin((sr - petal) * 14.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.35) * p;
	p = fract(p * 2.77) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.05 + time * 0.06, vec3(0.42, 0.50, 0.59), vec3(0.44, 0.33, 0.47), vec3(0.88, 1.04, 1.26), vec3(0.76, 0.74, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
