uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.21 + ph), vnoise2(p * 4.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.21 + 1.52 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 4.21 + 2.70 * wq + vec2(8.3, 2.8) - t * 1.16));
    v = vnoise2(p * 4.21 + 3.11 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.82 + sin(p.y * 5.22 + t * 1.54) * 4.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.98; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.26 / wf * sin(wf * 3.56 * q2.y + (time * 0.61) * 1.59); q2.y += 0.31 / wf * cos(wf * 3.58 * q2.x + (time * 0.61) * 2.16); }
	float d1 = fieldA(q1, (time * 0.61), 0.0);
	float d2 = fieldB(q2, (time * 0.61), 1.38);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.61) * 0.48));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.14, 0.14), vec3(0.80, 0.83, 0.81), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.983, 0.920) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
