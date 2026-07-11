uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.14;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 19.99 - t * 3.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	p = rot2(length(p) * 2.53 + (time * 0.53) * 1.06) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.75 * p.y + (time * 0.53) * 1.47); p.y += 0.21 / wf * cos(wf * 3.06 * p.x + (time * 0.53) * 1.44); }
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	p *= 1.0 + 0.27 * sin((time * 0.53) * 4.72);
	float d = 0.5 + 0.5 * field(p, (time * 0.53), 0.0);
	vec3 col = mix(vec3(0.80, 0.68, 0.64), vec3(0.06, 0.11, 0.06), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.963, 1.015) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
