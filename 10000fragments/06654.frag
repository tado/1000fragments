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
    v = sin(sa * 9.47 + sr * 20.65 - t * 4.28 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.38 + vec2(t * 0.87, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.80) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.37 + time * 0.11, vec3(0.56, 0.41, 0.48), vec3(0.42, 0.33, 0.42), vec3(0.84, 0.76, 0.97), vec3(0.87, 0.04, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
