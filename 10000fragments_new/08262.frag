uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.62;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.51 - t * 4.48 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.60;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.74; kp = rot2(0.76) * kp; kp *= 1.21; }
    v = sin(kp.x * 1.32 - t * 1.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	p.y += sin(p.x * 6.91 + time * 2.12) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.21, vec3(0.54, 0.54, 0.42), vec3(0.49, 0.41, 0.34), vec3(1.00, 1.31, 0.99), vec3(0.06, 0.91, 0.08));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
