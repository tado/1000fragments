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
    vec2 wq = vec2(vnoise2(p * 2.16 + ph), vnoise2(p * 2.16 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.16 + 2.35 * wq + vec2(1.7, 9.2) + t * 0.97),
                   vnoise2(p * 2.16 + 2.78 * wq + vec2(8.3, 2.8) - t * 0.70));
    v = vnoise2(p * 2.16 + 1.54 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.12 * vnoise2(p * 3.61 + t * 0.74);
    v = sin(wr * 18.27 - t * 0.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 3.58 + (time * 0.67) * 3.97) * 0.34;
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 0.58);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.081, 0.052, 0.083), vec3(0.689, 0.279, 0.148), smoothstep(0.0, 0.43, cc)), vec3(0.986, 0.844, 0.645), smoothstep(0.43, 1.0, cc));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.006, 0.960, 0.995);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
