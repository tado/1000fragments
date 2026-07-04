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

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.79;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.65); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.58, rv + 0.04 * sin(t * 0.79 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.26));
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 5.21 - time * 0.39); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.39, 0.22, 0.69) * (0.23 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
