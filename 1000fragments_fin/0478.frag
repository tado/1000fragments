uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.99 + vec2(t * 1.21, -t * 0.73);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.98 + ph), sin(lt * 5.0 + t * 0.77)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.24) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.41) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.75 + (time * 0.75) * 1.26) * 0.14;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.96, length(q1) * 5.48 - (time * 0.75) * 0.53); }
	q1 = rot2(length(q1) * -1.99 + (time * 0.75) * 1.29) * q1;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin((time * 0.75) * 2.50));
	q2.x += sin(q2.y * 2.62 + (time * 0.75) * 3.00) * 0.22;
	float d1 = fieldA(q1, (time * 0.75), 0.0);
	float d2 = fieldB(q2, (time * 0.75), 0.24);
	float d3 = fieldC(q3, (time * 0.75), 1.51);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = palette((d) * 1.02 + (time * 0.75) * 0.15, vec3(0.76, 0.59, 0.65), vec3(0.24, 0.23, 0.21), vec3(0.96, 1.05, 1.01), vec3(0.93, 0.08, 0.07));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.923, 0.985, 1.033);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
