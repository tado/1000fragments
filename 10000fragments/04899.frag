uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.92 + 0.30 * sin(t * 1.14)) + vec2(-0.50, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.41) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.75 * p.y + time * 1.81); p.y += 0.34 / wf * cos(wf * 2.95 * p.x + time * 1.15); }
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	p = fract(p * 2.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.22, vec3(0.46, 0.46, 0.52), vec3(0.34, 0.41, 0.47), vec3(0.83, 1.40, 1.27), vec3(0.74, 0.61, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
