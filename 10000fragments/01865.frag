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
    v = sin(sa * 8.43 + sr * 14.31 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.59 - time * 0.15); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(2.11) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.16, vec3(0.48, 0.44, 0.59), vec3(0.45, 0.44, 0.43), vec3(0.97, 1.01, 1.19), vec3(0.64, 0.68, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
