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
    v = sin(sa * 8.23 + sr * 21.49 - t * 0.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(2.26) * p; }
	p = (floor(p * 17.6) + 0.5) / 17.6;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.18, vec3(0.52, 0.43, 0.47), vec3(0.40, 0.45, 0.31), vec3(0.86, 0.76, 0.88), vec3(0.51, 0.49, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
