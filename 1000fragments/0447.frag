uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.25 + t * 5.09 + ph) + sin(p.y * 11.41 - t * 4.50 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.55 + sr * 7.87 - t * 3.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = rot2(2.32) * p;
	p += vec2(0.28, -0.29) * sin(length(p) * 4.87 - time * 1.56) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.98 + time * 0.07, vec3(0.55, 0.44, 0.57), vec3(0.31, 0.44, 0.31), vec3(1.13, 1.04, 1.09), vec3(0.55, 0.35, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
