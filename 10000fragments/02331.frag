uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.52 - t * 7.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.57 + sin(p.y * 5.35 + t * 3.01) * 1.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	p = rot2(length(p) * 3.64 + time * 0.78) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.51; p = rot2(1.41) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.23);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.11 + time * 0.14, vec3(0.52, 0.42, 0.50), vec3(0.47, 0.48, 0.34), vec3(0.82, 0.80, 1.07), vec3(0.63, 0.21, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
