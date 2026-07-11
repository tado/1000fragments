uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.97;
    v = 0.5 * (sin(1.0 * cp.x + t * 2.62) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.46) * sin(1.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.08 + vec2(t * 1.51, -t * 2.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(1.62) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.44 + time * 0.29, vec3(0.55, 0.57, 0.48), vec3(0.44, 0.48, 0.34), vec3(1.38, 1.15, 0.77), vec3(0.94, 0.85, 0.68));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
