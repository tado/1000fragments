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
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.19 * pow(abs(cos(ra * 3.0 + t * 2.90)), 1.63);
    v = sin((rr - pet) * 23.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.66, t * 2.49)) - 0.5) * 1.00;
    v = exp(-abs(bx) * 7.98) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.45 + (time * 0.85) * 0.48) * 0.17;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.85), 0.0);
	float d2 = fieldB(q2, (time * 0.85), 1.12);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.861, 0.911, 0.925), vec3(0.849, 0.292, 0.251), cc);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.97 + (time * 0.85) * 8.37);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.993, 0.996, 0.999);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
