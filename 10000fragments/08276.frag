uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.54;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.55)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.90 - t * 6.12 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.02;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.10 * sin(t * 3.05 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.08));
	q1 = sin(q1 * 2.22 + time * 0.55) * 1.19;
	q2 += vec2(-0.60, -0.10) * sin(length(q2) * 3.75 - time * 1.22) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.31, 0.38), vec3(0.73, 0.96, 0.74), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.50 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
