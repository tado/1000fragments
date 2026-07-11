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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.32;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.94); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.39, 0.51, rv + 0.09 * sin(t * 1.11 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.58) * 0.78), cos((time * 0.58) * 0.73)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.88 / 3.1415927, 0.37 / r + (time * 0.58) * 1.19);
	tv.x += tv.y * 0.26;
	float d = field(tv, (time * 0.58), 0.0);
	vec3 col = vec3(0.55, 0.60, 0.53) * (0.10 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.40, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.992, 1.021) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
