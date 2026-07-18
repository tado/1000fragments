uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.54 * jf)) * 0.71;
        xs += sin(length(p - im) * 68.79 - t * 9.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.67;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.93)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.68 - t * 6.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.72;
	p *= 1.59;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.20 + (time * 0.73) * 1.30) * 1.03;
	{ float fr = length(q1); q1 *= 1.0 + 0.71 * fr * fr; }
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 1.73);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.039, 0.076, 0.074), vec3(0.382, 0.471, 0.195), smoothstep(0.0, 0.46, cc)), vec3(1.000, 0.876, 0.548), smoothstep(0.46, 1.0, cc));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.006, 0.957, 1.006);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
