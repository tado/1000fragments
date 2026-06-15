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
    v = sin(sa * 7.78 + sr * 20.12 - t * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(1.74) * p; }
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.30, vec3(0.53, 0.59, 0.52), vec3(0.33, 0.43, 0.48), vec3(1.39, 1.39, 0.76), vec3(0.97, 0.53, 0.78));
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
