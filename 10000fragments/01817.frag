uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.18 + sin(p.y * 3.29 + t * 3.02) * 3.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.89 + sr * 16.03 - t * 2.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.21; p = rot2(2.57) * p; }
	p += vec2(0.77, -0.29) * sin(length(p) * 3.39 - time * 1.81) * 0.20;
	{ p = vec2(atan(p.y, p.x) * 2.13, length(p) * 5.85 - time * 0.24); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.58 + time * 0.27, vec3(0.48, 0.51, 0.52), vec3(0.43, 0.40, 0.44), vec3(0.83, 0.79, 0.83), vec3(0.59, 0.51, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
