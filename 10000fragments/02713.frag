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
    float petal = 0.55 + 0.22 * cos(sa * 5 + t * 2.62 + ph);
    v = sin((sr - petal) * 13.91);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.64 + t * 5.84 + ph) + sin(p.y * 13.31 - t * 5.06 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(1.04) * p; }
	p = rot2(p.y * -1.64 + time * 0.28) * p;
	p = rot2(length(p) * -1.89 + time * 1.13) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = d1 * d2;
	vec3 col = palette(d * 1.55 + time * 0.27, vec3(0.54, 0.47, 0.44), vec3(0.49, 0.37, 0.31), vec3(0.73, 1.21, 1.36), vec3(0.96, 0.27, 0.51));
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
