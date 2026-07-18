uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.86 + vec2(t * 1.11, -t * 0.85);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.68) * 1.37), cos((time * 0.68) * 1.06)) * 0.30;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.17 / 3.1415927, 1.34 / r + (time * 0.68) * 2.49);
	tv.x += tv.y * 0.31;
	float d = field(tv, (time * 0.68), 0.0);
	vec3 col = palette((d) * 1.16 + (time * 0.68) * 0.18, vec3(0.52, 0.45, 0.35), vec3(0.25, 0.26, 0.18), vec3(1.00, 1.01, 0.98), vec3(0.00, 0.06, 0.28));
	col *= clamp(r * 2.46, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.035, 1.001, 0.920);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
