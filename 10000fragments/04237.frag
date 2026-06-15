uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.13; vec2 jc = vec2(-0.53 + 0.3 * sin(t * 0.49 + ph), -0.54 + 0.3 * cos(t * 0.49 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.72 + vec2(t * 2.59, -t * 2.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	p = rot2(length(p) * 1.36 + time * 1.07) * p;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.59 - time * 0.40); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.12, vec3(0.45, 0.59, 0.42), vec3(0.44, 0.30, 0.47), vec3(0.81, 1.22, 0.84), vec3(0.39, 0.16, 0.56));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
