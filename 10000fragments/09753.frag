uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.50 + jf * 4.0), cos(t * 0.37 * jf)) * 0.44;
        xs += sin(length(p - im) * 67.66 - t * 4.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.86) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.61) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.77 * p.y + time * 0.71); p.y += 0.35 / wf * cos(wf * 3.46 * p.x + time * 1.53); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(0.60) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.15, vec3(0.44, 0.43, 0.52), vec3(0.35, 0.47, 0.43), vec3(1.40, 0.94, 0.86), vec3(0.43, 0.15, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
