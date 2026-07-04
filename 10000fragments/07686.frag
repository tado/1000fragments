uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.02 + vec2(t * 0.44, -t * 0.85);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.61 / 3.1415927, 0.54 / r + time * 1.50);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.22, vec3(0.59, 0.55, 0.46), vec3(0.46, 0.32, 0.41), vec3(1.37, 1.28, 1.37), vec3(0.37, 0.86, 0.45));
	col *= clamp(r * 1.85, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
