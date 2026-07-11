uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.12;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.35 + 0.05 * sin(t * 2.21 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.78;
	p = rot2(2.64) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.07, vec3(0.51, 0.59, 0.41), vec3(0.35, 0.39, 0.41), vec3(1.37, 1.00, 1.20), vec3(0.56, 0.97, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
