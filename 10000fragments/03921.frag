uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 27.65 - t * 1.60 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 37.83 - t * 1.60 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.03 + sr * 12.65 - t * 2.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(2.29) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.78 * p.y + time * 1.47); p.y += 0.40 / wf * cos(wf * 3.30 * p.x + time * 1.26); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.12, vec3(0.50, 0.47, 0.50), vec3(0.41, 0.45, 0.43), vec3(0.74, 1.31, 1.06), vec3(0.09, 0.40, 0.66));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
