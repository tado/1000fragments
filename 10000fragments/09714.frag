uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.17 - t * 1.11;
    v = sin(floor(lv * 3.8) / 3.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.14 * p.y + time * 0.84); p.y += 0.24 / wf * cos(wf * 2.55 * p.x + time * 2.08); }
	p = rot2(p.y * -3.50 + time * 0.49) * p;
	p *= 2.34;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.99));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.10, vec3(0.57, 0.41, 0.41), vec3(0.38, 0.41, 0.32), vec3(0.78, 1.39, 1.14), vec3(0.01, 0.58, 0.79));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
