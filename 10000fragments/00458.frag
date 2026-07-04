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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.64;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.98); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.57, rv + 0.07 * sin(t * 1.48 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	p += vec2(-0.98, 0.68) * sin(length(p) * 5.13 - time * 1.16) * 0.19;
	p = rot2(time * 0.87) * p;
	p = rot2(p.y * -3.56 + time * 0.40) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.51, 0.35, 0.98) * (0.08 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
