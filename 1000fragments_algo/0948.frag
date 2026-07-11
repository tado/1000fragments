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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 4.86;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.66); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.58, rv + 0.07 * sin(t * 0.56 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p.y += sin(p.x * 1.09 + (time * 0.69) * 1.08) * 0.07;
	p += vec2(sin((time * 0.69) * 0.82), cos((time * 0.69) * 1.18)) * 0.12;
	float an = atan(p.y, p.x) + (time * 0.69) * 0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.39 / 3.1415927, 1.02 / r + (time * 0.69) * 2.38);
	float d = field(tv, (time * 0.69), 0.0);
	vec3 col = palette((d) * 0.61 + (time * 0.69) * 0.16, vec3(0.40, 0.37, 0.34), vec3(0.11, 0.10, 0.08), vec3(0.73, 0.76, 0.72), vec3(0.99, 0.91, 0.55));
	col *= clamp(r * 2.26, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.007, 0.926) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
