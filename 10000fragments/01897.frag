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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.74;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.52); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.46, 0.56, rv + 0.06 * sin(t * 2.54 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.75 * p.y + time * 0.68); p.y += 0.26 / wf * cos(wf * 2.72 * p.x + time * 1.56); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.42, lr * 1.02 + time * -0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.13, vec3(0.50, 0.59, 0.45), vec3(0.48, 0.46, 0.40), vec3(0.72, 0.77, 1.22), vec3(0.26, 0.56, 0.71));
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.74 + time * 9.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
