uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.51 + 0.19 * sin(t * 1.07)) + vec2(-0.82, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.45 * p.y + time * 1.34); p.y += 0.47 / wf * cos(wf * 1.79 * p.x + time * 2.00); }
	p = rot2(length(p) * -3.37 + time * 0.57) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.18, 0.62, 0.48) * (0.08 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
