uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.84;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.83); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.57, rv + 0.08 * sin(t * 0.79 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.40) * p; }
	p = rot2(time * 0.87) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.91 * p.y + time * 0.73); p.y += 0.46 / wf * cos(wf * 3.28 * p.x + time * 1.55); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.04));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
