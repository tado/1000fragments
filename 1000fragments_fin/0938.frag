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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.54 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.66); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.08 / 3.1415927, 0.58 / r - (time * 0.90) * 2.17);
	float d = field(tv, (time * 0.90), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.123, 0.037, 0.149), vec3(0.729, 0.351, 0.458), smoothstep(0.0, 0.44, cc)), vec3(1.000, 0.940, 0.826), smoothstep(0.44, 1.0, cc));
	col *= clamp(r * 2.05, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.024, 0.950, 1.018);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
