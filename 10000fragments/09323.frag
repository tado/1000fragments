uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.26 + jf * 4.0), cos(t * 0.37 * jf)) * 0.42;
        xs += sin(length(p - im) * 181.36 - t * 5.80 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.88) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	{ p = vec2(atan(p.y, p.x) * 2.00, length(p) * 2.22 - time * 0.33); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(1.15) * p; }
	p = rot2(3.02) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.59 + time * 0.18, vec3(0.53, 0.55, 0.50), vec3(0.36, 0.40, 0.33), vec3(1.05, 0.98, 0.71), vec3(0.52, 0.96, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
