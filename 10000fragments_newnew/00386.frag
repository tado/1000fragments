uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.40 + vec2(t * 0.54, -t * 0.99);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.40 / 3.1415927, 1.09 / r + time * 2.75);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.22, vec3(0.59, 0.49, 0.42), vec3(0.46, 0.33, 0.40), vec3(0.95, 1.38, 0.83), vec3(0.13, 0.94, 0.26));
	col *= clamp(r * 2.88, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
