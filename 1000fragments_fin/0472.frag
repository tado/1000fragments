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
    float ma = sin(length(p - vec2(0.59, 0.0)) * 14.55 - t * 1.13 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 15.66 - t * 7.16 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.92 + ph), vnoise2(p * 4.92 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.92 + 1.00 * wq + vec2(1.7, 9.2) + t * 1.13),
                   vnoise2(p * 4.92 + 1.76 * wq + vec2(8.3, 2.8) - t * 0.42));
    v = vnoise2(p * 4.92 + 3.01 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.89;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.33 + 0.14 * sin(t * 2.53 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.30;
	p.y += sin(p.x * 2.31 + (time * 0.66) * 0.90) * 0.07;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(2.52) * q1;
	q2 += vec2(-0.12, 0.69) * sin(length(q2) * 2.67 - (time * 0.66) * 2.01) * 0.36;
	q2 = rot2(length(q2) * 3.93 + (time * 0.66) * 1.24) * q2;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.04;
	float d1 = fieldA(q1, (time * 0.66), 0.0);
	float d2 = fieldB(q2, (time * 0.66), 1.18);
	float d3 = fieldC(q3, (time * 0.66), 0.35);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = vec3(0.962, 0.507, 0.424) * (0.07 / (abs((d)) + 0.10));
	col = col / (1.0 + col);
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 2.34 + (time * 0.66) * 12.27);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.990, 0.989, 0.989);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
