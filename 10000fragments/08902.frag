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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.18;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.70); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.55, rv + 0.08 * sin(t * 1.49 + ph)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.37, t * 0.56)) - 0.5) * 1.39;
    v = exp(-abs(bx) * 7.89) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.27 + time * 0.25, vec3(0.50, 0.59, 0.45), vec3(0.37, 0.39, 0.32), vec3(0.71, 1.33, 0.85), vec3(0.82, 0.76, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
