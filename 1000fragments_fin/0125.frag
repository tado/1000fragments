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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.72;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.53); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.59, rv + 0.09 * sin(t * 0.61 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.58;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	p = rot2((time * 0.74) * -0.46) * p;
	float d = field(p, (time * 0.74), 0.0);
	vec3 col = palette(d * 0.45 + (time * 0.74) * 0.21, vec3(0.48, 0.39, 0.34), vec3(0.37, 0.33, 0.36), vec3(1.00, 1.04, 0.95), vec3(0.04, 0.39, 0.57));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.992, 1.013, 0.996);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
