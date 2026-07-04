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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.17;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.50); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.45, 0.57, rv + 0.05 * sin(t * 1.65 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p *= 1.0 + 0.33 * sin(time * 1.06);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.82;
	p = rot2(length(p) * 1.42 + time * 1.48) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.21));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
