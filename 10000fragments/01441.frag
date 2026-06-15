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
    v = sin(sa * 3.03 + sr * 18.34 - t * 2.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 1.42 + time * 0.50) * p;
	p += vec2(0.35, -0.78) * sin(length(p) * 3.99 - time * 1.58) * 0.28;
	p = rot2(1.99) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.57; p = rot2(1.02) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.28, vec3(0.60, 0.44, 0.50), vec3(0.34, 0.36, 0.48), vec3(0.75, 0.90, 0.85), vec3(0.98, 0.79, 0.17));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
