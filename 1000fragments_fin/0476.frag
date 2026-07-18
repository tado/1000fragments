uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.04 + vec2(t * 0.52, -t * 1.19);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.49;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.39)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.39 - t * 6.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.28 + (time * 0.69) * 0.69) * 0.06;
	p.y = abs(p.y) - 0.21;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.69) * 2.50));
	q1.x += sin(q1.y * 5.62 + (time * 0.69) * 1.84) * 0.16;
	q2 *= 2.85;
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 0.33);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.086, 0.083, 0.056), vec3(0.712, 0.288, 0.183), smoothstep(0.0, 0.45, cc)), vec3(1.000, 0.853, 0.657), smoothstep(0.45, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.949, 0.971, 1.054);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
