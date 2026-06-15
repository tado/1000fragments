uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.24 * cos(sa * 5 + t * 2.39 + ph);
    v = sin((sr - petal) * 8.14);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p = rot2(length(p) * 2.80 + time * 0.61) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.24; p = rot2(2.34) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.97 * p.y + time * 0.84); p.y += 0.26 / wf * cos(wf * 2.21 * p.x + time * 1.66); }
	p += vec2(-0.11, -0.20) * sin(length(p) * 3.05 - time * 0.91) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.71));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
