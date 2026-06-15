uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.60 + t * 3.59 + ph) + sin(p.y * 13.73 - t * 1.74 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.13 * cos(sa * 7 + t * 2.45 + ph);
    v = sin((sr - petal) * 8.18);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	p = fract(p * 1.34) - 0.5;
	p = abs(p) - 0.57;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(1.56) * p; }
	p = rot2(time * 1.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.57 + time * 0.19, vec3(0.51, 0.55, 0.60), vec3(0.47, 0.44, 0.35), vec3(1.05, 1.34, 0.91), vec3(0.60, 0.87, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
