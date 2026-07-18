uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.09 + ga * 5.0 - t * 2.78 + ph);
    v = arm * exp(-gr * 0.56);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.05);
    float gsh = hash21(vec2(grow, floor(t * 7.82))) - 0.5;
    float gx = p.x + gsh * 0.62;
    v = sin(gx * 12.40 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.93));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.42;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.34 + 0.14 * sin(t * 3.59 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 1.53;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.67;
	q2 = rot2(length(q2) * -2.20 + (time * 0.77) * 1.35) * q2;
	q3 = rot2((time * 0.77) * -1.41) * q3;
	q3 = fract(q3 * 2.75) - 0.5;
	float d1 = fieldA(q1, (time * 0.77), 0.0);
	float d2 = fieldB(q2, (time * 0.77), 1.32);
	float d3 = fieldC(q3, (time * 0.77), 0.38);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.79, 0.73, 0.65) + vec3(0.06, 0.08, 0.05);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.002, 0.975, 1.018);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
