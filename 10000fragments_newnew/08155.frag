uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.21 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.37 + t * 1.45 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.93 + 0.39 * sin(t * 1.39)) + vec2(-0.35, 0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.71;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.54; p = rot2(0.76) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.82 * p.y + time * 1.80); p.y += 0.26 / wf * cos(wf * 3.62 * p.x + time * 1.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = d1 * d2;
	vec3 col = palette(d * 0.64 + time * 0.03, vec3(0.44, 0.54, 0.58), vec3(0.35, 0.34, 0.40), vec3(1.16, 0.76, 1.36), vec3(0.66, 0.61, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
