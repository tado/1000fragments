uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.95 + t * 2.02 + ph) + sin(p.y * 6.51 - t * 2.02 + ph)
        + sin((p.x + p.y) * 3.19 + t * 2.02 + ph) + sin(length(p) * 11.35 - t * 2.02 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.32 + t * 0.97 + ph) + sin(p.y * 5.20 - t * 0.97 + ph)
        + sin((p.x + p.y) * 2.10 + t * 0.97 + ph) + sin(length(p) * 11.03 - t * 0.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	p = rot2(time * -1.13) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(2.26) * p; }
	p = rot2(length(p) * 2.69 + time * 0.44) * p;
	p *= 2.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = d1 * d2;
	vec3 col = palette(d * 1.26 + time * 0.03, vec3(0.58, 0.58, 0.48), vec3(0.36, 0.39, 0.32), vec3(0.78, 0.94, 0.96), vec3(0.80, 0.59, 0.61));
	col = mod(col * 2.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
