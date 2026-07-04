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
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.12); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.59, rv + 0.03 * sin(t * 0.87 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	p = sin(p * 2.54 + time * 1.47) * 1.37;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.03));
	p = rot2(length(p) * -2.46 + time * 1.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.90, 0.60, 1.00) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
