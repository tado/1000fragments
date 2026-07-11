uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.00 + sin(p.y * 1.76 + t * 4.00) * 1.06 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.94 - t * 1.02;
    v = sin(floor(lv * 2.8) / 2.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.96;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(2.36) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = d1 + d2;
	vec3 col = palette(d * 1.40 + time * 0.13, vec3(0.40, 0.48, 0.55), vec3(0.40, 0.32, 0.50), vec3(0.73, 1.34, 1.06), vec3(0.70, 0.98, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
