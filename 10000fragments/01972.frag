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
    v = sin(sa * 7.79 + sr * 9.66 - t * 3.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = rot2(p.y * 3.24 + time * 0.18) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.51 * p.y + time * 1.45); p.y += 0.21 / wf * cos(wf * 3.81 * p.x + time * 0.71); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.23, vec3(0.46, 0.45, 0.41), vec3(0.48, 0.37, 0.42), vec3(1.01, 0.92, 1.32), vec3(0.90, 0.48, 0.59));
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
