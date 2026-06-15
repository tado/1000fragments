uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.89 + t * 0.71 + ph) + sin(p.y * 8.44 - t * 3.20 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.10; vec2 jc = vec2(-0.01 + 0.3 * sin(t * 0.35 + ph), 0.60 + 0.3 * cos(t * 0.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.16; p = rot2(2.00) * p; }
	p = rot2(p.y * -3.03 + time * 0.43) * p;
	p = rot2(time * -0.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.55 + time * 0.11, vec3(0.57, 0.56, 0.58), vec3(0.40, 0.45, 0.36), vec3(1.32, 0.92, 0.70), vec3(0.89, 0.63, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
