uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.16 * pow(abs(cos(ra * 5.0 + t * 1.58)), 1.58);
    v = sin((rr - pet) * 23.33 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.59 + sr * 8.68 - t * 0.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.15; p = rot2(0.64) * p; }
	p = fract(p * 2.83) - 0.5;
	p = (floor(p * 27.8) + 0.5) / 27.8;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.03 + time * 0.19, vec3(0.59, 0.50, 0.46), vec3(0.45, 0.42, 0.37), vec3(0.85, 1.16, 0.73), vec3(0.27, 0.01, 0.09));
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.23 + time * 11.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
