uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.58; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.16 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.79) * 1.05), cos((time * 0.79) * 1.15)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.01 / 3.1415927, 1.40 / r + (time * 0.79) * 2.47);
	float d = field(tv, (time * 0.79), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.024, 0.018, 0.094), vec3(0.429, 0.212, 0.633), smoothstep(0.0, 0.51, cc)), vec3(1.000, 0.700, 0.868), smoothstep(0.51, 1.0, cc));
	col *= clamp(r * 1.67, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.048, 0.995, 0.931);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
