uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.13 + t * 0.75 + ph) + sin(p.y * 13.36 - t * 0.75 + ph)
        + sin((p.x + p.y) * 10.38 + t * 0.75 + ph) + sin(length(p) * 14.78 - t * 0.75 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.45;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.79)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 13.90 - t * 4.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.60 * p.y + time * 1.75); p.y += 0.49 / wf * cos(wf * 1.52 * p.x + time * 1.81); }
	p = rot2(p.y * 1.60 + time * 0.21) * p;
	p *= 1.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.83);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.20, vec3(0.57, 0.45, 0.51), vec3(0.45, 0.38, 0.39), vec3(0.85, 1.38, 0.90), vec3(0.72, 0.74, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
