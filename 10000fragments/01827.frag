uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.36 + sr * 22.72 - t * 2.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.97, length(p) * 5.41 - time * 0.23); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.81 * p.y + time * 1.57); p.y += 0.27 / wf * cos(wf * 2.11 * p.x + time * 0.85); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.06, vec3(0.52, 0.57, 0.53), vec3(0.39, 0.44, 0.31), vec3(1.05, 1.39, 1.26), vec3(0.82, 0.55, 0.70));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
