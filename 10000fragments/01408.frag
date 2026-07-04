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
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.21;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.53); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.50, rv + 0.08 * sin(t * 0.71 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.03 / 3.1415927, 1.09 / r + time * 2.30);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.37, 0.81, 0.84) + vec3(0.24, 0.25, 0.12);
	col *= clamp(r * 2.61, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
