uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.34) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.08 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.23 * cos(sa * 4 + t * 1.57 + ph);
    v = sin((sr - petal) * 17.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.08 * p.y + time * 1.11); p.y += 0.20 / wf * cos(wf * 2.29 * p.x + time * 1.33); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(0.81) * p; }
	p = rot2(time * -1.00) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = d1 + d2;
	vec3 col = palette(d * 1.33 + time * 0.20, vec3(0.41, 0.46, 0.52), vec3(0.32, 0.33, 0.39), vec3(0.78, 1.23, 0.74), vec3(0.02, 0.77, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
