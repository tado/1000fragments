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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.73;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.50); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.43, 0.54, rv + 0.04 * sin(t * 1.29 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.94 / 3.1415927, 0.55 / r - time * 2.00);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.40, 0.93, 0.95) * (0.17 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.99, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
