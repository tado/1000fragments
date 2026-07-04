uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.78 + vec2(t * 0.97, -t * 1.38);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.43) * p * 18.30;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.35 + time * 0.03, vec3(0.42, 0.54, 0.41), vec3(0.32, 0.32, 0.45), vec3(1.33, 0.93, 1.21), vec3(0.45, 0.29, 0.44)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
