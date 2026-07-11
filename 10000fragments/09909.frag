uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.67; vec2 jc = vec2(-0.61 + 0.3 * sin(t * 1.18 + ph), 0.04 + 0.3 * cos(t * 1.18 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 15.97 - t * 2.43 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 35.69 - t * 2.43 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	{ p = vec2(atan(p.y, p.x) * 1.87, length(p) * 3.73 - time * 0.32); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.37; p = rot2(0.75) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.73 * p.y + time * 0.63); p.y += 0.29 / wf * cos(wf * 2.34 * p.x + time * 1.10); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = d1 + d2;
	vec3 col = palette(d * 0.55 + time * 0.06, vec3(0.40, 0.49, 0.59), vec3(0.46, 0.46, 0.32), vec3(0.83, 0.80, 1.39), vec3(0.41, 0.13, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
