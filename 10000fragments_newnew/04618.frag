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
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.19 * jf)) * 0.83;
        xs += sin(length(p - im) * 172.38 - t * 13.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.75) * p * 17.54;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.22 + time * 0.16, vec3(0.48, 0.46, 0.49), vec3(0.37, 0.34, 0.33), vec3(1.25, 0.94, 1.12), vec3(0.08, 0.71, 0.73)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
