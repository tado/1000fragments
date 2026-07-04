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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.59;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.41); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.40, 0.51, rv + 0.07 * sin(t * 1.70 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.27));
	p = rot2(p.y * 3.34 + time * 0.64) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.53, 0.92, 0.68) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
