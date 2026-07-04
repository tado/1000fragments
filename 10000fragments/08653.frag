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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.49;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.84); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.53, rv + 0.06 * sin(t * 1.39 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(2.17) * p; }
	p = rot2(p.y * 1.12 + time * 0.81) * p;
	p = rot2(length(p) * -3.44 + time * 0.56) * p;
	p = rot2(2.55) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.38, 0.48), vec3(0.90, 0.75, 0.46), d);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
