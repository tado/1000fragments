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
    v = 0.5 * sin(length(p) * 37.90 - t * 3.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.89) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.96 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.73); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.35; }
	q2 = rot2(q2.y * -3.63 + (time * 0.82) * 1.18) * q2;
	q2 = abs(q2) - 0.43;
	float d1 = fieldA(q1, (time * 0.82), 0.0);
	float d2 = fieldB(q2, (time * 0.82), 1.75);
	float d3 = fieldC(q3, (time * 0.82), 1.47);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.644, 0.831, 0.997), vec3(0.150, 0.099, 0.040), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.988, 1.024, 0.932);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
