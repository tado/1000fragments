uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.54 + vec2(t * 0.66, -t * 0.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.34; vec2 jc = vec2(0.15 + 0.3 * sin(t * 1.34 + ph), -0.51 + 0.3 * cos(t * 1.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	{ p = vec2(atan(p.y, p.x) * 2.34, length(p) * 5.45 - time * 0.54); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.23, lr * 1.45 + time * -0.11); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.11, vec3(0.54, 0.44, 0.41), vec3(0.44, 0.33, 0.45), vec3(1.03, 1.13, 0.81), vec3(0.17, 0.69, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
