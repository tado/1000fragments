uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.44 - t * 4.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.00 * p.y + time * 1.25); p.y += 0.30 / wf * cos(wf * 2.62 * p.x + time * 0.95); }
	p = rot2(time * -0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.01, vec3(0.54, 0.55, 0.55), vec3(0.37, 0.35, 0.31), vec3(0.79, 1.31, 1.36), vec3(0.59, 0.60, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
