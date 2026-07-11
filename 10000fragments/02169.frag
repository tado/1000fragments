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
    v = sin(sa * 9.53 + sr * 6.00 - t * 1.24 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.33 + sin(p.y * 5.61 + t * 5.25) * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(1.36) * p; }
	p = rot2(length(p) * -1.35 + time * 0.21) * p;
	p = rot2(0.56) * p;
	p = abs(p) - 0.40;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 * d2;
	vec3 col = palette(d * 0.53 + time * 0.00, vec3(0.47, 0.46, 0.43), vec3(0.48, 0.31, 0.30), vec3(0.83, 0.82, 0.82), vec3(0.89, 0.95, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
