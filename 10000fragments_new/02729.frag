uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.76 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.32 + t * 2.42 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.17 + 0.25 * sin(t * 1.59)) + vec2(-0.44, 0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 7.83 + time * 1.68) * 0.37;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.13, vec3(0.50, 0.44, 0.54), vec3(0.33, 0.39, 0.46), vec3(0.84, 1.16, 1.30), vec3(0.51, 0.56, 0.17));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
