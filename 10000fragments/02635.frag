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
    v = sin(sa * 10.49 + sr * 21.20 - t * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.64, length(p) * 4.28 - time * 0.78); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(1.52) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.07, vec3(0.44, 0.48, 0.45), vec3(0.34, 0.46, 0.40), vec3(1.01, 1.09, 0.92), vec3(0.44, 0.10, 0.29));
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
