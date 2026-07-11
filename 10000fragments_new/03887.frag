uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.00 + t * 1.36 + ph) * 0.7;
    float wb = sin(p.y * 7.87 - t * 0.95 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(-0.35 + 0.3 * sin(t * 0.43 + ph), -0.52 + 0.3 * cos(t * 1.60 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(1.53) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 3.58 - time * 0.51); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = d1 * d2;
	vec3 col = palette(d * 1.61 + time * 0.11, vec3(0.42, 0.51, 0.53), vec3(0.32, 0.49, 0.32), vec3(0.74, 0.73, 1.29), vec3(0.55, 0.45, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
