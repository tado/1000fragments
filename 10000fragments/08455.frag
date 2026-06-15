uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 31.56 - t * 6.32 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 10.16 - t * 6.32 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.26; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.70 + ph), -0.25 + 0.3 * cos(t * 0.70 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p = fract(p * 2.15) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.12, lr * 2.11 + time * -0.19); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.00);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.16 + time * 0.22, vec3(0.48, 0.49, 0.40), vec3(0.43, 0.44, 0.41), vec3(1.10, 1.23, 1.28), vec3(0.49, 0.41, 0.72));
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
