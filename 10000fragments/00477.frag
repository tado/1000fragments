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
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.26, t * 0.98 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.86;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.02); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.50, rv + 0.07 * sin(t * 0.96 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p = rot2(2.91) * p;
	p = rot2(time * 1.10) * p;
	p.x += sin(p.y * 3.44 + time * 3.44) * 0.32;
	p *= 1.59;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 + d2;
	vec3 col = palette(d * 1.12 + time * 0.10, vec3(0.44, 0.44, 0.56), vec3(0.38, 0.32, 0.33), vec3(0.85, 1.09, 1.01), vec3(0.68, 0.44, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
