uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.03; vec2 jc = vec2(-0.01 + 0.3 * sin(t * 0.57 + ph), -0.03 + 0.3 * cos(t * 0.57 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.89 * sin(mf + 3.0) + ph), cos(t * 0.89 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.17 * p.y + time * 1.09); p.y += 0.48 / wf * cos(wf * 2.48 * p.x + time * 0.73); }
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 5.56 - time * 0.29); }
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(2.28) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = d1 + d2;
	vec3 col = palette(d * 1.45 + time * 0.20, vec3(0.50, 0.46, 0.52), vec3(0.42, 0.32, 0.45), vec3(0.71, 1.22, 1.29), vec3(0.50, 0.68, 0.78));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
