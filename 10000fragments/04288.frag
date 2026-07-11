uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.97 + t * 0.71 + ph) + sin(p.y * 12.48 - t * 0.71 + ph)
        + sin((p.x + p.y) * 3.62 + t * 0.71 + ph) + sin(length(p) * 6.09 - t * 0.71 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 31.76 - t * 4.45 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 31.57 - t * 4.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.18; p = rot2(1.21) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.80 * p.y + time * 1.59); p.y += 0.31 / wf * cos(wf * 3.36 * p.x + time * 1.71); }
	p *= 1.69;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = d1 * d2;
	vec3 col = palette(d * 0.97 + time * 0.03, vec3(0.55, 0.51, 0.60), vec3(0.41, 0.36, 0.39), vec3(0.89, 0.87, 1.21), vec3(0.19, 0.72, 0.89));
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
