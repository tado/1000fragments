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
    v = sin(sa * 9.67 + sr * 21.77 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.55; p = rot2(0.85) * p; }
	p = (floor(p * 19.1) + 0.5) / 19.1;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.17, vec3(0.52, 0.51, 0.48), vec3(0.46, 0.42, 0.37), vec3(0.86, 0.83, 0.76), vec3(0.84, 0.64, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
