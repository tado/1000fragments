uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.48 + sr * 6.95 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p = rot2(p.y * -3.43 + time * 0.71) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.89 * p.y + time * 1.29); p.y += 0.34 / wf * cos(wf * 2.39 * p.x + time * 0.97); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.15, vec3(0.54, 0.50, 0.48), vec3(0.38, 0.34, 0.49), vec3(0.82, 1.39, 1.02), vec3(0.26, 0.52, 0.96));
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
