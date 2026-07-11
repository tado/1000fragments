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
    float petal = 0.49 + 0.27 * cos(sa * 3 + t * 2.35 + ph);
    v = sin((sr - petal) * 17.48);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 0.75 + ph), 0.04 + 0.3 * cos(t * 0.75 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.50;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.92, 0.87) * sin(length(p) * 2.71 - time * 0.74) * 0.27;
	p = rot2(time * 1.11) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.38; p = rot2(1.88) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.13, vec3(0.46, 0.57, 0.55), vec3(0.35, 0.44, 0.41), vec3(0.82, 1.11, 0.99), vec3(0.90, 0.33, 0.61));
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
