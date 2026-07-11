uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.97 + sin(p.y * 3.73 + t * 0.70) * 4.90 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.05; vec2 jc = vec2(-0.33 + 0.3 * sin(t * 0.89 + ph), -0.79 + 0.3 * cos(t * 0.89 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.17; p = rot2(1.83) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.92) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.23);
	float d = d1 * d2;
	vec3 col = palette(d * 1.54 + time * 0.02, vec3(0.50, 0.41, 0.48), vec3(0.48, 0.40, 0.33), vec3(1.23, 1.03, 0.72), vec3(0.99, 0.87, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
