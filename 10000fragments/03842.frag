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
    float petal = 0.65 + 0.22 * cos(sa * 5 + t * 1.95 + ph);
    v = sin((sr - petal) * 6.47);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(1.34) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.28, vec3(0.59, 0.59, 0.49), vec3(0.37, 0.44, 0.34), vec3(0.84, 1.16, 0.84), vec3(0.18, 0.10, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
