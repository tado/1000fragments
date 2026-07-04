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
    v = sin(sa * 9.82 + sr * 22.08 - t * 2.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.44; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.43; p = rot2(1.47) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.08, vec3(0.57, 0.55, 0.48), vec3(0.44, 0.41, 0.47), vec3(1.21, 1.35, 1.34), vec3(0.49, 0.62, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
