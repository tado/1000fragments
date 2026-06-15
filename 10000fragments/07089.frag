uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.22 * cos(sa * 3 + t * 0.96 + ph);
    v = sin((sr - petal) * 14.71);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	p = rot2(length(p) * 2.55 + time * 0.40) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(2.27) * p; }
	p += vec2(0.90, -0.83) * sin(length(p) * 4.60 - time * 0.87) * 0.14;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.41 * p.y + time * 0.75); p.y += 0.26 / wf * cos(wf * 3.31 * p.x + time * 1.98); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.18, 0.05), vec3(0.98, 0.98, 0.88), d);
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
