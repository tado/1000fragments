uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.89; vec2 jc = vec2(-0.56 + 0.3 * sin(t * 1.19 + ph), -0.31 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.12 * cos(sa * 3 + t * 2.41 + ph);
    v = sin((sr - petal) * 14.78);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.54 * p.y + time * 1.88); p.y += 0.29 / wf * cos(wf * 2.67 * p.x + time * 1.01); }
	p = rot2(2.01) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.11 + time * 0.27, vec3(0.42, 0.59, 0.58), vec3(0.35, 0.38, 0.50), vec3(0.80, 1.06, 1.23), vec3(0.71, 0.14, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
