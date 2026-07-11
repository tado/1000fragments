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
    float grow = floor(p.y * 11.29);
    float gsh = hash21(vec2(grow, floor(t * 5.04))) - 0.5;
    float gx = p.x + gsh * 0.43;
    v = sin(gx * 19.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.63));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.47; p = rot2(1.53) * p; }
	p = (floor(p * 24.5) + 0.5) / 24.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.78 * p.y + time * 0.78); p.y += 0.37 / wf * cos(wf * 3.03 * p.x + time * 1.72); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.30, vec3(0.47, 0.47, 0.41), vec3(0.46, 0.45, 0.33), vec3(0.79, 0.95, 1.35), vec3(0.02, 0.06, 0.57));
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 1.79 + time * 11.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
