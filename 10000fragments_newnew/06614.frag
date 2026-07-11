uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.94 + 0.35 * sin(t * 1.10)) + vec2(-0.64, -0.08) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	p = sin(p * 2.29 + time * 1.25) * 0.93;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.18 * p.y + time * 0.71); p.y += 0.30 / wf * cos(wf * 3.08 * p.x + time * 2.14); }
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	p = rot2(length(p) * 2.67 + time * 1.04) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.34, 0.27), vec3(0.98, 0.64, 0.78), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
