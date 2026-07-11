uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.76 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = rot2(1.01) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.22 * p.y + time * 1.29); p.y += 0.39 / wf * cos(wf * 1.85 * p.x + time * 1.41); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.03, vec3(0.57, 0.49, 0.46), vec3(0.42, 0.40, 0.31), vec3(0.71, 0.85, 1.39), vec3(0.40, 0.34, 0.28));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
