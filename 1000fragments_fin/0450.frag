uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.78;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.06)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.03 - t * 2.09 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.90;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.14)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.65 - t * 4.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 4.28 + (time * 0.88) * 1.24) * 0.35;
	q2 = rot2(q2.y * -2.82 + (time * 0.88) * 0.95) * q2;
	q2 = rot2((time * 0.88) * -0.91) * q2;
	float d1 = fieldA(q1, (time * 0.88), 0.0);
	float d2 = fieldB(q2, (time * 0.88), 0.73);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.041, 0.052, 0.123), vec3(0.069, 0.455, 0.507), smoothstep(0.0, 0.51, cc)), vec3(0.983, 0.814, 0.435), smoothstep(0.51, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.003, 0.971, 1.006);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
