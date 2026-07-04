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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.50;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 1.11); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.57, rv + 0.09 * sin(t * 1.57 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.17 + time * -0.48); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.09));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
