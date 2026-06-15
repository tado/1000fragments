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
    v = sin(sa * 10.29 + sr * 4.88 - t * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.60 + time * 0.53) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(2.53) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.30, vec3(0.55, 0.54, 0.51), vec3(0.32, 0.48, 0.40), vec3(1.10, 1.15, 1.02), vec3(0.70, 0.04, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
