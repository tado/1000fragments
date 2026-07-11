uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.91 + 0.42 * sin(t * 0.43)) + vec2(-0.65, 0.21) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	p += vec2(0.77, -0.60) * sin(length(p) * 3.29 - time * 0.83) * 0.23;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.49; p = rot2(1.35) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.86 * p.y + time * 0.70); p.y += 0.38 / wf * cos(wf * 3.83 * p.x + time * 0.88); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.45, 0.69, 0.88) * (0.17 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
