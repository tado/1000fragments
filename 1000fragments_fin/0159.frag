uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.42 + vec2(t * 0.40, -t * 0.27);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.33 * jf)) * 0.46;
        xs += sin(length(p - im) * 64.45 - t * 8.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.63) * 0.47), cos((time * 0.63) * 0.74)) * 0.19;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.63) * 0.70));
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, (time * 0.63), 0.0);
	float d2 = field2(p, (time * 0.63), 0.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.69 + (time * 0.63) * 0.08, vec3(0.56, 0.47, 0.34), vec3(0.27, 0.24, 0.21), vec3(1.04, 1.00, 1.03), vec3(0.04, 0.08, 0.24));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.026, 0.994, 0.950);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
