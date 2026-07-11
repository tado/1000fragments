uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.17 * vnoise2(p * 2.35 + t * 0.56);
    v = sin(wr * 19.63 - t * 3.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.69 * p.y + time * 1.87); p.y += 0.27 / wf * cos(wf * 3.35 * p.x + time * 1.11); }
	p = (floor(p * 18.0) + 0.5) / 18.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.20, vec3(0.58, 0.41, 0.54), vec3(0.48, 0.37, 0.46), vec3(0.81, 1.08, 1.10), vec3(0.08, 0.39, 0.90));
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.69 + time * 6.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
