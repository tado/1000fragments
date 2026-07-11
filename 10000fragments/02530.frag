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
    float petal = 0.61 + 0.11 * cos(sa * 3 + t * 0.30 + ph);
    v = sin((sr - petal) * 9.06);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.14; p = rot2(1.61) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.23, vec3(0.49, 0.51, 0.56), vec3(0.37, 0.32, 0.50), vec3(1.21, 0.78, 1.30), vec3(0.36, 0.86, 0.27));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
