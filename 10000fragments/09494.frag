uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.04; vec2 jc = vec2(-0.40 + 0.3 * sin(t * 0.86 + ph), -0.65 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.14 * cos(sa * 3 + t * 1.99 + ph);
    v = sin((sr - petal) * 9.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.96, 0.65) * sin(length(p) * 5.04 - time * 0.57) * 0.31;
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 4.27 - time * 0.55); }
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.54; p = rot2(2.20) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 + d2;
	vec3 col = palette(d * 0.59 + time * 0.23, vec3(0.54, 0.41, 0.59), vec3(0.31, 0.38, 0.43), vec3(0.89, 1.07, 1.00), vec3(0.70, 0.19, 0.73));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
