uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.83; vec2 jc = vec2(-0.46 + 0.3 * sin(t * 0.52 + ph), 0.61 + 0.3 * cos(t * 1.20 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.60;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.89 - t * 5.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.33, length(q1) * 3.23 - time * 0.50); }
	q1 = (floor(q1 * 12.4) + 0.5) / 12.4;
	q2 = rot2(q2.y * -2.68 + time * 0.62) * q2;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.12 + time * 0.27, vec3(0.56, 0.52, 0.51), vec3(0.35, 0.46, 0.47), vec3(0.96, 1.17, 0.71), vec3(0.28, 0.47, 0.83));
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
