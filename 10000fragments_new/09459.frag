uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.45 - t * 5.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(-0.68 + 0.3 * sin(t * 1.31 + ph), -0.52 + 0.3 * cos(t * 0.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	p = rot2(1.36) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(1.93) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.60 + time * 0.10, vec3(0.41, 0.59, 0.51), vec3(0.34, 0.30, 0.50), vec3(1.32, 1.21, 0.99), vec3(0.05, 0.07, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
