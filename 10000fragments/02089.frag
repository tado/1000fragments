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
    v = sin(sa * 5.53 + sr * 5.93 - t * 4.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p = rot2(1.95) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.23; p = rot2(2.02) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.19, vec3(0.48, 0.59, 0.50), vec3(0.47, 0.39, 0.49), vec3(1.16, 1.32, 1.16), vec3(0.75, 0.12, 0.60));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
