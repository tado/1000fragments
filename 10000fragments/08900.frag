uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.00;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.06 * sin(t * 4.37 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.10 + ph), sin(lt * 5.0 + t * 1.40)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = rot2(length(q1) * 1.06 + time * 0.40) * q1;
	q2 = rot2(time * 0.97) * q2;
	q2 += vec2(-0.21, -0.46) * sin(length(q2) * 3.13 - time * 1.07) * 0.25;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.95));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.74, 1.05, 1.34) + vec3(0.10, 0.07, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
