uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.24, t * 0.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.03 + sr * 14.21 - t * 1.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.06 * p.y + time * 0.92); p.y += 0.35 / wf * cos(wf * 3.53 * p.x + time * 0.71); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.16; p = rot2(0.80) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.82);
	float d = d1 + d2;
	vec3 col = palette(d * 0.60 + time * 0.20, vec3(0.41, 0.42, 0.51), vec3(0.41, 0.41, 0.41), vec3(0.95, 1.06, 0.74), vec3(0.70, 0.12, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
