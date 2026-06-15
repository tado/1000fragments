uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 39.36 - t * 5.59 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 38.07 - t * 5.59 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.26 * cos(sa * 6 + t * 1.65 + ph);
    v = sin((sr - petal) * 7.50);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	p = rot2(length(p) * -2.51 + time * 0.61) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = d1 + d2;
	vec3 col = palette(d * 1.71 + time * 0.03, vec3(0.57, 0.53, 0.45), vec3(0.41, 0.41, 0.42), vec3(1.31, 0.82, 0.82), vec3(0.31, 0.33, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
