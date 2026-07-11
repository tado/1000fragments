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

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.71);
    float gsh = hash21(vec2(grow, floor(t * 6.17))) - 0.5;
    float gx = p.x + gsh * 1.14;
    v = sin(gx * 6.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.56));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.39;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.84); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.56, rv + 0.09 * sin(t * 2.33 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 4.87 + time * 3.84) * 0.31;
	q2 = rot2(length(q2) * 3.13 + time * 0.81) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.34, 0.38), vec3(0.84, 0.63, 0.97), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
