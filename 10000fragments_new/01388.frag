uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.64 * sin(mf + 3.0) + ph), cos(t * 0.87 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.81 + 0.13 * sin(t * 0.77)) + vec2(-0.75, -0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	p = rot2(length(p) * -2.48 + time * 1.06) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.28, vec3(0.41, 0.60, 0.40), vec3(0.39, 0.32, 0.45), vec3(0.87, 1.23, 1.31), vec3(0.01, 0.08, 0.79));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
