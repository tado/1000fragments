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
    float petal = 0.60 + 0.23 * cos(sa * 4 + t * 2.54 + ph);
    v = sin((sr - petal) * 18.29);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.28 + vec2(t * 2.08, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p += vec2(-0.20, 0.08) * sin(length(p) * 3.37 - time * 1.39) * 0.13;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.56; p = rot2(1.25) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = d1 + d2;
	vec3 col = palette(d * 1.36 + time * 0.01, vec3(0.42, 0.56, 0.41), vec3(0.33, 0.34, 0.38), vec3(0.90, 1.01, 1.09), vec3(0.35, 0.10, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
