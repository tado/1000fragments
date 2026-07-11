uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.19 * cos(sa * 7 + t * 1.88 + ph);
    v = sin((sr - petal) * 14.90);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.88 * p.y + time * 1.90); p.y += 0.31 / wf * cos(wf * 2.46 * p.x + time * 1.16); }
	p = rot2(length(p) * -2.52 + time * 0.64) * p;
	p = abs(p) - 0.29;
	p = rot2(time * 1.19) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.90));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
