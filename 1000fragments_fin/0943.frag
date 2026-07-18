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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.65 + ph), vnoise2(p * 3.65 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.65 + 1.40 * wq + vec2(1.7, 9.2) + t * 1.16),
                   vnoise2(p * 3.65 + 2.26 * wq + vec2(8.3, 2.8) - t * 0.47));
    v = vnoise2(p * 3.65 + 2.03 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.83) * 0.76), cos((time * 0.83) * 0.85)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.01 / 3.1415927, 0.32 / r - (time * 0.83) * 1.34);
	float d = field(tv, (time * 0.83), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.009, 0.062, 0.150), vec3(0.974, 0.530, 0.298), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.08, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.037, 0.992, 0.931);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
