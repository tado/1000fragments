uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.09; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.74 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	float an = atan(p.y, p.x) + (time * 0.51) * -0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.39 / 3.1415927, 0.77 / r + (time * 0.51) * 0.78);
	float d = field(tv, (time * 0.51), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.28, 0.24), vec3(0.72, 0.74, 0.73), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.34, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.944, 1.009) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
