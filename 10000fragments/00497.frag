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
    float petal = 0.57 + 0.14 * cos(sa * 4 + t * 2.55 + ph);
    v = sin((sr - petal) * 16.05);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.64 + time * 0.39) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(1.22) * p; }
	p = abs(p) - 0.73;
	p += vec2(0.69, 0.97) * sin(length(p) * 3.82 - time * 1.87) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.22, vec3(0.57, 0.54, 0.58), vec3(0.36, 0.45, 0.43), vec3(1.13, 0.98, 1.34), vec3(0.04, 0.17, 0.76));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
