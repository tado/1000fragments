uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.92 + vec2(t * 0.88, -t * 1.30);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.41), cos(time * 0.75)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 0.40 / r - time * 1.93);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.23, vec3(0.58, 0.59, 0.48), vec3(0.43, 0.41, 0.37), vec3(1.16, 1.25, 0.97), vec3(0.53, 0.51, 0.88));
	col *= clamp(r * 2.25, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
