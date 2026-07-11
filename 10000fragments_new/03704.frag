uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.22; vec2 jc = vec2(0.29 + 0.3 * sin(t * 0.70 + ph), 0.62 + 0.3 * cos(t * 0.74 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(2.23) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.44, lr * 2.69 + time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.21, vec3(0.55, 0.48, 0.45), vec3(0.39, 0.43, 0.48), vec3(1.04, 0.87, 1.33), vec3(0.33, 0.15, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
