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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.26;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.44); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.53, rv + 0.10 * sin(t * 2.51 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	p *= 1.34;
	float d = 0.5 + 0.5 * field(p, (time * 0.56), 0.0);
	vec2 hq = rot2(0.64) * p * 16.03;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.61 + (time * 0.56) * 0.02, vec3(0.38, 0.42, 0.51), vec3(0.28, 0.31, 0.30), vec3(0.95, 0.87, 0.82), vec3(0.36, 0.42, 0.63)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.022, 0.949, 1.006);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
