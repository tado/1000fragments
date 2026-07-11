uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.58 + 0.3 * sin(t * 0.83 + ph), -0.79 + 0.3 * cos(t * 0.83 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.68 + sr * 20.75 - t * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	p = rot2(p.y * 2.86 + time * 0.34) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.00) * p;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.21 + time * 0.17, vec3(0.48, 0.43, 0.40), vec3(0.32, 0.39, 0.44), vec3(1.37, 0.84, 1.11), vec3(0.27, 0.86, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
