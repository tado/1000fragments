uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.76 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.49 + t * 1.40 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.26 + 0.35 * sin(t * 0.71)) + vec2(-0.88, 0.20) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	p = rot2(length(p) * 2.58 + time * 0.54) * p;
	p = rot2(1.10) * p;
	p = fract(p * 2.04) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.26 + time * 0.15, vec3(0.40, 0.56, 0.57), vec3(0.45, 0.44, 0.36), vec3(1.37, 1.08, 1.17), vec3(0.44, 0.25, 0.62));
	col = fract(col * 1.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
