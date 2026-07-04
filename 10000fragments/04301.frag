uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.67;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.83 - t * 3.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.23) * p * 15.97;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.99 + time * 0.06, vec3(0.44, 0.48, 0.57), vec3(0.33, 0.46, 0.35), vec3(1.31, 0.94, 1.06), vec3(0.53, 0.62, 0.25)) * v;
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
