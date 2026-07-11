uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.85; vec2 jc = vec2(-0.73 + 0.3 * sin(t * 1.13 + ph), 0.09 + 0.3 * cos(t * 1.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.20;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.89)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.04 - t * 7.30 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.03 * sin(mf + 3.0) + ph), cos(t * 0.91 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.68, -0.04) * sin(length(q2) * 4.74 - time * 1.70) * 0.25;
	q3 = rot2(q3.y * 1.07 + time * 0.89) * q3;
	q3 = rot2(length(q3) * -3.14 + time * 1.31) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d3 = fieldC(q3, time, 1.75);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.08 + time * 0.34, vec3(0.46, 0.42, 0.58), vec3(0.39, 0.34, 0.41), vec3(1.03, 0.96, 0.75), vec3(0.91, 0.69, 0.84));
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
