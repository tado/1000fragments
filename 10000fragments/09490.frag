uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.58 + sin(p.y * 1.46 + t * 3.57) * 2.12 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.19; vec2 jc = vec2(-0.03 + 0.3 * sin(t * 1.09 + ph), -0.56 + 0.3 * cos(t * 1.09 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p = rot2(p.y * -1.04 + time * 0.31) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.51; p = rot2(1.86) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.19 + time * 0.03, vec3(0.45, 0.49, 0.49), vec3(0.41, 0.43, 0.44), vec3(0.94, 1.00, 1.26), vec3(0.16, 0.34, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
