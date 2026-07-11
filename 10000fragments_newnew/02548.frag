uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.48 + t * 3.10 + ph) * 0.7;
    float wb = sin(p.y * 14.41 - t * 2.81 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	p = rot2(p.y * 2.53 + time * 0.41) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.66 * p.y + time * 1.63); p.y += 0.40 / wf * cos(wf * 3.04 * p.x + time * 1.82); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.54, 0.73, 0.43) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
