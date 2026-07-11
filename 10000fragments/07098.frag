uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.98, t * 1.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.30 + sr * 16.81 - t * 1.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.51; p = rot2(2.43) * p; }
	p = rot2(time * 1.20) * p;
	p = rot2(2.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.74 + time * 0.27, vec3(0.52, 0.47, 0.52), vec3(0.44, 0.49, 0.38), vec3(1.11, 0.93, 1.30), vec3(0.99, 0.40, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
