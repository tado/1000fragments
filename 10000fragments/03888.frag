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
    v = sin(sa * 5.28 + sr * 6.78 - t * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.52;
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 3.56 - time * 0.11); }
	p *= 1.97;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(1.44) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.10, vec3(0.53, 0.59, 0.44), vec3(0.44, 0.44, 0.44), vec3(1.31, 1.23, 0.75), vec3(0.08, 0.51, 0.65));
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
